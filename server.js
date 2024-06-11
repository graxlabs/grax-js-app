import express from "express";
import session from "express-session";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import winston from "winston";
import expressWinston from "express-winston";
import passport from "passport";
import { Strategy } from "passport-forcedotcom";

const app = express();

app.use(
  session({
    secret: "your-secret-key",
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
      callbackURL: "https://nzoschke.ngrok.dev/auth/forcedotcom/callback",
    },
    function verify(token, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    },
  ),
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the sessions
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

app.get("/", (req, res) => {
  res.send('<a href="/auth/forcedotcom">Login with Salesforce</a>');
});

app.get("/auth/forcedotcom", passport.authenticate("forcedotcom"));

app.get("/auth/forcedotcom/callback", passport.authenticate("forcedotcom", { failureRedirect: "/" }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/profile");
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
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

const base = "/";
app.use("/", auth, express.static("dist/client/"));
app.use(ssrHandler);

app.listen(process.env.PORT || 8080);
