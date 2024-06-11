# GRAX JS App

Reuser your Salesforce History with GRAX JS App and SDK

## SFDC OAuth

Create connected app:

- Settings -> App Manager -> New Connected App
- Enable OAuth Settings
- Callback URL: https://EXAMPLE.herokuapp.com/auth/forcedotcom/callback
- Scope: "Access the identity URL service"
- Uncheck "Require Proof Key for Code Exchange"

Set config in `.env` or with `heroku config:set`

- `SESSION_SECRET`
- `SFDC_CALLBACK_URL`
- `SFDC_CLIENT_ID`
- `SFDC_CLIENT_SECRET`

To test locally:

```bash
# add Callback URL: https://EXAMPLE.ngrok.dev/auth/forcedotcom/callback
export $(cat .env)
node server.js
ngrok http --domain EXAMPLE.ngrok.dev 4321
```

# Astro Starter Kit

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
