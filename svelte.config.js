import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Force the output to the standard directory
			pages: "build",
			assets: "build",
			fallback: "404.html",
		}),
	},
};
