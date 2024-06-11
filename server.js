import express from "express";
import session from "express-session";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import winston from "winston";
import expressWinston from "express-winston";
import passport from "passport";
import { Strategy } from "passport-forcedotcom";

const app = express();

if (process.env.SFDC_ORG_ID === undefined) {
  console.error("SFDC_ORG_ID is not set");
  process.exit(1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      clientID: process.env.SFDC_CLIENT_ID,
      clientSecret: process.env.SFDC_CLIENT_SECRET,
      scope: ["id"],
      callbackURL: process.env.SFDC_CALLBACK_URL,
    },
    function verify(token, refreshToken, profile, done) {
      console.log(profile);
      if (!profile.id.startsWith(process.env.SFDC_ORG_ID)) {
        return cb(null, false, { message: "Incorrect SFDC org." });
      }

      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  }),
);

app.get("/auth/forcedotcom", passport.authenticate("forcedotcom"));

app.get("/auth/forcedotcom/callback", passport.authenticate("forcedotcom", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/private/chart");
});

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.send(`Hello, ${req.user.displayName}! <br> <a href="/logout">Logout</a>`);
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

function auth(req, res, next) {
  if (req.url.startsWith("/private")) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/");
  }

  // skip auth for root, assets and dataclips
  return next();
}

app.use("/", auth, express.static("dist/client/"));
app.use(ssrHandler);

app.listen(process.env.PORT || 4321);
