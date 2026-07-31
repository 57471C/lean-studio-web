# Lean Studio Web — Setup

This folder is a clean scaffold based on the SpeedDF-Web stack.

## Important: rename the route files

The sandbox filesystem cannot create filenames that start with `+`.

After you copy this project to your machine:

```sh
cd lean-studio-web/src/routes
mv layout.svelte +layout.svelte
mv page.svelte +page.svelte
```

## Create the GitHub repo and push

```sh
# On your machine, from the parent of lean-studio-web
cd lean-studio-web
git init
git add .
git commit -m "chore: scaffold lean-studio-web (SvelteKit + Tailwind v4 + Cloudflare)"

# Create the repo on GitHub (empty, no README)
# Then:
git branch -M main
git remote add origin https://github.com/57471C/lean-studio-web.git
git push -u origin main
```

Or create the repo first on GitHub as `lean-studio-web` under `57471C`, then clone and copy these files in.

## Install & run

```sh
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Cloudflare Pages

Point Cloudflare Pages at the repo, build command `npm run build`, output directory `build` (adapter already configured).
Connect the custom domain lean.studio in the Cloudflare dashboard.
