# Change Mgmt Studio (Static)

Pure static build of Change Mgmt Studio for **amorisolutions.xyz** — no Node server required at runtime.

Upload the `dist/` folder to any static host: Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, nginx, etc.

## Features (same as the Next.js app)

- Client workspaces, branding, 8 consulting templates
- Drafts in browser localStorage
- Markdown & HTML export
- Optional password gate (client-side)

## Local development

```bash
cp .env.example .env.local
# Set VITE_SITE_PASSWORD in .env.local

npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output is in **`dist/`** — upload that entire folder to your host.

Preview locally:

```bash
npm run preview
```

## Deploy examples

### Netlify

Drag-and-drop `dist/`, or connect Git with:

- Build command: `npm run build`
- Publish directory: `dist`

`netlify.toml` and `public/_redirects` handle SPA routing.

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Add a `_redirects` rule or **Single Page Application** setting for `/* → /index.html`

### Any static host + nginx

```nginx
root /var/www/change-mgmt-studio;
try_files $uri $uri/ /index.html;
```

## Password protection

The login page uses **`VITE_SITE_PASSWORD`**, which is embedded in the JavaScript bundle at build time. This is **light obfuscation only** — anyone can inspect the bundle.

For real protection on static hosting, use:

- **Cloudflare Access**
- **Netlify password protection** (Pro)
- **nginx basic auth** in front of the site

## vs. the Next.js version

| | `change-mgmt-studio` (Next.js) | `change-mgmt-studio-static` |
|--|--|--|
| Hosting | Needs Node/Vercel/etc. | Any static host |
| Password | Server-side (secure) | Client-side (obfuscation) |
| API routes | Yes | No |

## Stack

Vite, React 19, TypeScript, Tailwind CSS v4, React Router.
