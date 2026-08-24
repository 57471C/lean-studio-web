import { json, error } from "@sveltejs/kit";
import {
	corsHeadersForOrigin,
	getAllowedOrigin,
	getLatestJsonFromGitHubRelease,
} from "$lib/server/githubLatestJson";
import type { RequestHandler } from "./$types";

const OWNER = "57471C";

const APPS: Record<string, { repo: string; userAgent: string }> = {
	lsvideo: {
		repo: "LS-Video",
		userAgent: "lean-studio-lsvideo-updater",
	},
	speeddf: {
		repo: "speedDF",
		userAgent: "lean-studio-speeddf-updater",
	},
};

export const OPTIONS: RequestHandler = async ({ request }) => {
	return new Response(null, {
		headers: corsHeadersForOrigin(request.headers.get("origin")),
	});
};

export const GET: RequestHandler = async ({ fetch, setHeaders, request, params }) => {
	const appName = params.app?.toLowerCase();

	if (!appName || !APPS[appName]) {
		error(404, "App not found");
	}

	const { repo, userAgent } = APPS[appName];

	const origin = request.headers.get("origin");
	const allowed = getAllowedOrigin(origin);
	if (allowed) {
		setHeaders({ "Access-Control-Allow-Origin": allowed });
	}

	try {
		const result = await getLatestJsonFromGitHubRelease({
			owner: OWNER,
			repo: repo,
			assetName: "latest.json",
			userAgent: userAgent,
			fetch,
		});

		if (!result.ok) {
			return json({ error: result.error }, { status: result.status });
		}

		setHeaders({ "cache-control": "public, max-age=300" });
		return json(result.data, {
			headers: { "content-type": "application/json" },
		});
	} catch (err: unknown) {
		console.error(`Error fetching updater manifest for ${OWNER}/${repo}:`, err);
		return json({ error: "Internal Server Error" }, { status: 500 });
	}
};
