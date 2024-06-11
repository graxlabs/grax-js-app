# GRAX JS App

Reuse your Salesforce History with GRAX JS App and SDK

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/graxlabs/grax-js-app)

## Motivation

GRAX is the easiest way to capture all your Salesforce history for reuse.

First you can deploy GRAX to Heroku with two clicks to start capturing all the Salesforce history. See the [GRAX Deployment Guide for Heroku](https://documentation.grax.com/docs/heroku-install) to learn more.

Now you've empowered your developers to build and run new apps on Heroku that reuse this data for analytics, internal tooling and customer-facing experiences.

This app demonstrates how to visualize your data in a Heroku web app.

It also demonstrates how you can search and analyze your Salesforce history and share the results with colleagues, and third-party tools like Google Sheets and Excel.

## Security

Pages under `/private` require SFDC OAuth to the Org ID specified in `SFDC_ORG_ID`.
Pages under `/shared` require secret specified in `SHARE_TOKEN` and passed as a query param `?t=<SHARE_TOKEN>`

## Dev

```bash
export $(cat .env)
npm run dev
```

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
