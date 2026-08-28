import { env } from "$env/dynamic/private";
import type { GitHubRelease } from "$lib/types";

const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = { data: unknown; expiresAt: number };

/** Per-repo in-memory cache (one Worker isolate may serve many apps). */
const cacheByKey = new Map<string, CacheEntry>();

export function getAllowedOrigin(origin: string | null): string | null {
	if (!origin) return null;
	if (
		origin === "tauri://localhost" ||
		origin === "https://tauri.localhost" ||
		origin === "http://tauri.localhost" ||
		origin === "app://localhost" ||
		origin.startsWith("http://localhost:") ||
		origin.startsWith("https://localhost:")
	) {
		return origin;
	}
	return null;
}

export function corsHeadersForOrigin(origin: string | null): Record<string, string> {
	const allowed = getAllowedOrigin(origin);
	const headers: Record<string, string> = {
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, User-Agent",
	};
	if (allowed) {
		headers["Access-Control-Allow-Origin"] = allowed;
	}
	return headers;
}

export type LatestJsonOptions = {
	owner: string;
	repo: string;
	/** Release asset filename. Default: latest.json */
	assetName?: string;
	/** User-Agent for GitHub API */
	userAgent?: string;
	/** SvelteKit/event fetch */
	fetch: typeof fetch;
};

/**
 * Fetch the `latest.json` (or named) asset from the repo's latest GitHub Release.
 * Uses GITHUB_TOKEN from private env when set (required for private repos).
 * Never expose the token to the client.
 *
 * Private release files must be downloaded via the assets API
 * (`Accept: application/octet-stream`), not browser_download_url.
 */
export async function getLatestJsonFromGitHubRelease(
	options: LatestJsonOptions,
): Promise<{ ok: true; data: unknown } | { ok: false; status: number; error: string }> {
	const { owner, repo, assetName = "latest.json", userAgent = "lean-studio-updater", fetch } =
		options;
	const cacheKey = `${owner}/${repo}/${assetName}`;

	const hit = cacheByKey.get(cacheKey);
	if (hit && Date.now() < hit.expiresAt) {
		return { ok: true, data: hit.data };
	}

	const token = env.GITHUB_TOKEN;

	const apiHeaders: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"User-Agent": userAgent,
		"X-GitHub-Api-Version": "2022-11-28",
	};
	if (token) {
		apiHeaders.Authorization = `Bearer ${token}`;
	}

	const releaseRes = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/releases/latest`,
		{ headers: apiHeaders },
	);

	if (!releaseRes.ok) {
		const detail =
			releaseRes.status === 403
				? "GitHub API rate limited or forbidden — set GITHUB_TOKEN on the server"
				: releaseRes.status === 404
					? "No latest release found for this repository"
					: "Failed to fetch release from GitHub";
		return { ok: false, status: releaseRes.status === 404 ? 404 : 500, error: detail };
	}

	const release = (await releaseRes.json()) as GitHubRelease;
	const asset = release.assets?.find((a) => a.name === assetName);

	if (!asset) {
		return {
			ok: false,
			status: 404,
			error: `${assetName} file not found in the latest GitHub release assets`,
		};
	}

	const assetHeaders: Record<string, string> = {
		"User-Agent": userAgent,
		"X-GitHub-Api-Version": "2022-11-28",
	};
	if (token) {
		assetHeaders.Authorization = `Bearer ${token}`;
	}

	let assetRes: Response;
	if (asset.id) {
		assetHeaders.Accept = "application/octet-stream";
		assetRes = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/releases/assets/${asset.id}`,
			{ headers: assetHeaders },
		);
	} else {
		assetRes = await fetch(asset.browser_download_url, { headers: assetHeaders });
	}

	if (!assetRes.ok) {
		return { ok: false, status: 500, error: "Failed to download asset data payload" };
	}

	const data: unknown = await assetRes.json();

	cacheByKey.set(cacheKey, {
		data,
		expiresAt: Date.now() + CACHE_TTL_MS,
	});

	return { ok: true, data };
}
