export interface GitHubAsset {
	id: number;
	name: string;
	browser_download_url: string;
	url: string;
}

export interface GitHubRelease {
	tag_name: string;
	assets: GitHubAsset[];
}
