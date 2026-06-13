# GitHub Pages hosting (GitHub only)

Deploy **change-mgmt-studio-static** to GitHub Pages with custom domain **amorisolutions.xyz**. No Cloudflare or Vercel required.

## One-time setup

### 1. Add the site password secret

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | Value |
|------|--------|
| `VITE_SITE_PASSWORD` | Your site password |

The workflow bakes this into the build. Change the secret and re-run the workflow to rotate the password.

### 2. Enable GitHub Pages

Repo → **Settings** → **Pages**

- **Source:** GitHub Actions (not “Deploy from a branch”)
- Save

### 3. Push to `main`

Every push to `main` runs `.github/workflows/deploy.yml`, builds `dist/`, and publishes.

First deploy: **Actions** tab → open the workflow run → wait for green checkmarks.

Your site will be at:

- `https://amoriox.github.io/change-mgmt-studio-static/` (until custom domain is live)
- `https://amorisolutions.xyz` (after DNS step below)

### 4. Custom domain in GitHub

Still under **Settings** → **Pages**:

- **Custom domain:** `amorisolutions.xyz`
- Enable **Enforce HTTPS** once DNS verifies (can take up to 24 hours)

`public/CNAME` in this repo already contains `amorisolutions.xyz`.

### 5. DNS at Porkbun (replace parking records)

Remove Porkbun parking. Add **one** of these:

**Option A — A records (apex domain, recommended by GitHub)**

| Type | Host | Value |
|------|------|--------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

**Option B — CNAME (if Porkbun supports ALIAS/ANAME for apex)**

| Type | Host | Value |
|------|------|--------|
| CNAME | @ | `amoriox.github.io` |

For `www` (optional):

| Type | Host | Value |
|------|------|--------|
| CNAME | www | `amoriox.github.io` |

### 6. Verify

- GitHub **Pages** settings should show “DNS check successful”
- Visit `https://amorisolutions.xyz` → login page
- Test `/dashboard` after login (SPA routing uses `404.html` fallback)

## Local development

```bash
cp .env.example .env.local
# set VITE_SITE_PASSWORD
npm install
npm run dev
```

## Password security note

`VITE_SITE_PASSWORD` is embedded in the published JavaScript. It keeps casual visitors out, not determined attackers. For stronger protection, use a private repo (already) and share the password only with clients.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Actions build fails | Check **Actions** log; ensure `VITE_SITE_PASSWORD` secret exists |
| `/dashboard` 404 | Workflow copies `index.html` → `404.html`; redeploy |
| Domain still shows Porkbun parking | DNS not updated or still propagating (up to 48h) |
| HTTPS not available | Wait for DNS verify, then enable Enforce HTTPS in Pages settings |
| Old password works | Update secret, push empty commit or re-run workflow |

## Manual re-deploy

**Actions** → **Deploy to GitHub Pages** → **Run workflow**
