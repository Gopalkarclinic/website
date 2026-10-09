# Hostinger Node.js deployment

1. hPanel → Websites → Add website → **Node.js Apps** → **Import Git Repository** → select `Gopalkarclinic/website`, branch `main`.
2. Settings:
   - Framework: **Next.js**
   - Node version: **20.x or 22.x**
   - Build command: `npm run build`
   - Start command: `npm start`
3. Environment variable: `NEXT_PUBLIC_SITE_URL` = your preview/final URL (no trailing slash).
4. Deploy. Every `git push` to `main` can auto-redeploy.

Notes
- All video/frame/image assets live in `public/` (served by Node, cached 1 year). Nothing uses Supabase storage.
- `PORT` is read automatically from Hostinger.
- Phase 2 (Supabase, Resend) needs more env vars; add them in the same screen.
