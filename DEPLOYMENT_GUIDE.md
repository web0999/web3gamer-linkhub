# Deployment Guide

## Option 1: Cloudflare Pages (Recommended)

1. Push this repository to GitHub (`web3gamer-linkhub`, branch `main`).
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Select your `web3gamer-linkhub` repository.
4. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Production branch**: `main`
5. Click **Save and Deploy**. Cloudflare will provide a free `*.pages.dev` URL and automatic deployments on every push to `main`.

## Option 2: GitHub Pages (Fallback)

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

1. Push the repository to GitHub.
2. In your GitHub repository, go to **Settings -> Pages -> Source** and select **GitHub Actions**.
3. If deploying to a project subpath (`https://<user>.github.io/web3gamer-linkhub/`), set `base: '/web3gamer-linkhub/'` in `vite.config.ts`.

## Current Environment Status

- Local Git repository initialized on `main`.
- GitHub CLI (`gh`) and GitHub MCP are not configured in this environment, so remote creation and push require your GitHub credentials.

