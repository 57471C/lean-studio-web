import { describe, expect, it, vi } from "vitest";
import {
	corsHeadersForOrigin,
	getAllowedOrigin,
	getLatestJsonFromGitHubRelease,
} from "./githubLatestJson";

describe("getAllowedOrigin", () => {
	it("allows tauri and localhost origins", () => {
		expect(getAllowedOrigin("tauri://localhost")).toBe("tauri://localhost");
		expect(getAllowedOrigin("https://tauri.localhost")).toBe("https://tauri.localhost");
		expect(getAllowedOrigin("http://localhost:5173")).toBe("http://localhost:5173");
		expect(getAllowedOrigin("https://evil.com")).toBeNull();
		expect(getAllowedOrigin(null)).toBeNull();
	});
});

describe("corsHeadersForOrigin", () => {
	it("returns appropriate CORS headers", () => {
		const headers = corsHeadersForOrigin("tauri://localhost");
		expect(headers["Access-Control-Allow-Origin"]).toBe("tauri://localhost");
		expect(headers["Access-Control-Allow-Methods"]).toBe("GET, OPTIONS");
	});
});

describe("getLatestJsonFromGitHubRelease", () => {
	it("downloads release asset using GitHub API releases/assets endpoint", async () => {
		const mockFetch = vi.fn();

		// 1. Mock release metadata endpoint
		mockFetch.mockResolvedValueOnce(
			new Response(
				JSON.stringify({
					tag_name: "v1.0.0",
					assets: [
						{
							id: 99999,
							name: "latest.json",
							browser_download_url:
								"https://github.com/57471C/LS-TimeStudy/releases/download/v1.0.0/latest.json",
						},
					],
				}),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		// 2. Mock asset download endpoint
		mockFetch.mockResolvedValueOnce(
			new Response(
				JSON.stringify({
					version: "1.0.0",
					notes: "Initial release",
				}),
				{ status: 200, headers: { "Content-Type": "application/octet-stream" } },
			),
		);

		const result = await getLatestJsonFromGitHubRelease({
			owner: "57471C",
			repo: "LS-TimeStudy-test-repo",
			assetName: "latest.json",
			userAgent: "lean-studio-timestudy-updater",
			fetch: mockFetch as unknown as typeof fetch,
		});

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data).toEqual({ version: "1.0.0", notes: "Initial release" });
		}

		expect(mockFetch).toHaveBeenCalledTimes(2);
		expect(mockFetch).toHaveBeenNthCalledWith(
			1,
			"https://api.github.com/repos/57471C/LS-TimeStudy-test-repo/releases/latest",
			expect.objectContaining({
				headers: expect.objectContaining({
					Accept: "application/vnd.github+json",
					"User-Agent": "lean-studio-timestudy-updater",
					"X-GitHub-Api-Version": "2022-11-28",
				}),
			}),
		);
		expect(mockFetch).toHaveBeenNthCalledWith(
			2,
			"https://api.github.com/repos/57471C/LS-TimeStudy-test-repo/releases/assets/99999",
			expect.objectContaining({
				headers: expect.objectContaining({
					Accept: "application/octet-stream",
					"User-Agent": "lean-studio-timestudy-updater",
					"X-GitHub-Api-Version": "2022-11-28",
				}),
			}),
		);
	});
});
