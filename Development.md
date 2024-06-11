# Development

Run Astro dev environment locally:

```bash
npm install

export $(cat .env)
npm run dev
```

To run with auth, run the Express adapter, middleware and ngrok locally:

```bash
export $(cat .env)
node server.js
ngrok http --domain EXAMPLE.ngrok.dev 4321
```
