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
	timestudy: {
		repo: "LS-TimeStudy",
		userAgent: "lean-studio-timestudy-updater",
	},
};

const GH_TIMESTUDY_DOWNLOAD =
	"https://github.com/57471C/LS-TimeStudy/releases/download/";
const R2_TIMESTUDY_DOWNLOAD = "https://downloads.lean.studio/timestudy/";

type PlatformEntry = { url?: string; signature?: string };

/** Point TimeStudy updater at R2; signatures stay as signed. */
function rewriteTimeStudyPlatformUrls(data: unknown): unknown {
	if (!data || typeof data !== "object") return data;
	const copy = structuredClone(data) as { platforms?: Record<string, PlatformEntry> };
	const platforms = copy.platforms;
	if (!platforms) return copy;
	for (const entry of Object.values(platforms)) {
		if (entry?.url?.startsWith(GH_TIMESTUDY_DOWNLOAD)) {
			entry.url = R2_TIMESTUDY_DOWNLOAD + entry.url.slice(GH_TIMESTUDY_DOWNLOAD.length);
		}
	}
	return copy;
}

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

		const payload = appName === "timestudy" ? rewriteTimeStudyPlatformUrls(result.data) : result.data;

		setHeaders({ "cache-control": "public, max-age=300" });
		return json(payload, {
			headers: { "content-type": "application/json" },
		});
	} catch (err: unknown) {
		console.error(`Error fetching updater manifest for ${OWNER}/${repo}:`, err);
		return json({ error: "Internal Server Error" }, { status: 500 });
	}
};
