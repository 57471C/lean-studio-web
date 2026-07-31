# Lean Studio Web

Marketing site for the Lean Studio suite — powered by SvelteKit, Tailwind CSS v4, and Cloudflare Pages.

Domain: [lean.studio](https://lean.studio)

## Stack

Same foundation as [SpeedDF-Web](https://github.com/57471C/SpeedDF-Web):

- SvelteKit 2 + Svelte 5
- Tailwind CSS v4 (`@tailwindcss/vite`)
- TypeScript
- Biome
- `@sveltejs/adapter-cloudflare`
- Vitest

## Getting started

```sh
npm install
npm run dev
```

## Scripts

| Command            | Description                |
|--------------------|----------------------------|
| `npm run dev`      | Dev server                 |
| `npm run build`    | Production build           |
| `npm run preview`  | Preview production build   |
| `npm run check`    | Type-check                 |
| `npm run test`     | Run tests                  |

## Deploy

Configured for Cloudflare Pages via `wrangler.jsonc` and the Cloudflare adapter.
