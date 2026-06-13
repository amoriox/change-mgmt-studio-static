# Deploy to amorisolutions.xyz (static edition)

This project builds to **`dist/`**. No Node server at runtime.

## Before you deploy

Password and URL are read at **build time** (`VITE_*` vars). Set them in your host’s build environment, not only in local `.env.local`.

```bash
VITE_SITE_PASSWORD=your-password
VITE_SITE_URL=https://amorisolutions.xyz
```

Local production test:

```bash
npm run build
npm run preview
# open http://localhost:4173
```

---

## Option A — Cloudflare Pages (recommended)

Free static hosting + easy custom domain + optional Cloudflare Access for real password protection.

### 1. Push the repo to GitHub

```bash
cd ~/Projects/change-mgmt-studio-static
gh repo create change-mgmt-studio-static --private --source=. --remote=origin
git push -u origin main
```

### 2. Create a Pages project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select the `change-mgmt-studio-static` repo
4. Build settings:
   - **Framework preset:** None (or Vite if listed)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Environment variables** (Production + Preview):
   - `VITE_SITE_PASSWORD` = your site password
   - `VITE_SITE_URL` = `https://amorisolutions.xyz`
6. Deploy

### 3. Custom domain

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `amorisolutions.xyz` (and `www.amorisolutions.xyz` if you want)
3. If the domain is already on Cloudflare, DNS is automatic. Otherwise, add the CNAME Cloudflare shows at your registrar.

### 4. SPA routing

Cloudflare Pages serves `index.html` for unknown paths by default on most setups. If deep links 404, add a **`public/_redirects`** file (already included) or a `_routes.json` / **Single Page Application** behavior in project settings.

### 5. Stronger password (optional)

Client-side `VITE_SITE_PASSWORD` is obfuscation only. For real protection:

**Cloudflare Zero Trust** → **Access** → create an application for `amorisolutions.xyz` with email OTP or one-time PIN. You can then remove the in-app login or keep both.

---

## Option B — Netlify

### 1. Connect Git or drag-and-drop

**Git:** Import repo at [app.netlify.com](https://app.netlify.com)

- Build command: `npm run build`
- Publish directory: `dist`
- Env vars: `VITE_SITE_PASSWORD`, `VITE_SITE_URL`

**Manual:** Run `npm run build` locally and drag the **`dist`** folder into Netlify Drop.

### 2. Custom domain

**Domain settings** → **Add custom domain** → `amorisolutions.xyz` → follow DNS instructions.

`netlify.toml` and `public/_redirects` handle SPA routing.

### 3. Netlify password (paid)

**Site configuration** → **Access control** → **Password protection** (Pro plan) for server-side gating without exposing the password in JS.

---

## Option C — Mac mini + nginx

On the Mac mini:

```bash
cd ~/Projects/change-mgmt-studio-static
npm run build
sudo mkdir -p /var/www/amorisolutions
sudo cp -R dist/* /var/www/amorisolutions/
```

nginx site config (`/opt/homebrew/etc/nginx/servers/amorisolutions.conf` or `/etc/nginx/sites-available/amorisolutions`):

```nginx
server {
    listen 80;
    server_name amorisolutions.xyz www.amorisolutions.xyz;
    root /var/www/amorisolutions;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

HTTPS with Caddy (simpler than certbot):

```
amorisolutions.xyz {
    root * /var/www/amorisolutions
    try_files {path} /index.html
    file_server
}
```

Point DNS **A record** to your public IP (or use **Cloudflare Tunnel** if you don’t want to expose the home IP).

Rebuild and recopy `dist/` after each update:

```bash
npm run build && sudo cp -R dist/* /var/www/amorisolutions/
```

---

## Which project should use amorisolutions.xyz?

Use **one** production deployment:

| Project | Host type |
|---------|-----------|
| `change-mgmt-studio-static` | Cloudflare Pages / Netlify / nginx — **no Node** |
| `change-mgmt-studio` (Next.js) | Vercel / Railway / Node server |

Don’t point the same domain at both.

---

## Rebuild after password change

Because `VITE_SITE_PASSWORD` is baked into the bundle:

1. Update the env var on your host (or `.env.local` locally)
2. Trigger a new deploy / run `npm run build` again
