# GRAX JS App

Reuse your Salesforce History with GRAX JS App and SDK

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/graxlabs/grax-js-app)

## Motivation

GRAX is the easiest way to capture all your Salesforce history for reuse.

First you can deploy GRAX to Heroku with two clicks to start capturing all the Salesforce history. See the [GRAX Deployment Guide for Heroku](https://documentation.grax.com/docs/heroku-install) to learn more.

Now you've empowered your developers to build and run new apps on Heroku that reuse this data for analytics, internal tooling and customer-facing experiences.

This app demonstrates how to visualize your data in a Heroku web app.

It also demonstrates how you can search and analyze your Salesforce history and share the results with colleagues, and third-party tools like Google Sheets and Excel.

## Deploy

- Create SFDC Connected App for OAuth
  - Log into Salesforce
  - Settings -> App Manager -> New Connected App
  - Enable OAuth Settings
  - Callback URL: https://EXAMPLE.herokuapp.com/auth/forcedotcom/callback
  - Scope: "Access the identity URL service"
  - Uncheck "Require Proof Key for Code Exchange"
- Deploy app to Heroku
- Set required config (see .env.sample)

## How It Works

This uses the GRAX Search API to get months or years of Opportunity history. The `grax-search` module makes this API easy to use, just specify an object like `Opportunity`.

This data can be passed to web app components like `Plot.astro` or `Table.astro`.

Alternatively it can be passed to API endpoints like `csv.ts`.

## Security

Pages under `/private` require SFDC OAuth to the Org ID specified in `SFDC_ORG_ID`.

Pages under `/shared` require secret specified in `SHARE_TOKEN` and passed as a query param `?t=<SHARE_TOKEN>`.
