export interface GitHubAsset {
	name: string;
	browser_download_url: string;
}

export interface GitHubRelease {
	tag_name: string;
	assets: GitHubAsset[];
}
