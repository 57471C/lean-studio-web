export type AppStatus = "available" | "beta" | "coming";

export interface AppInfo {
	id: string;
	name: string;
	prefix: string;
	/** When set, title renders as base + accent-coloured suffix (e.g. speed + DF) */
	prefixAccent?: string;
	/** Title font family token: lean (default) or display (Space Grotesk) */
	titleFont?: "lean" | "display";
	tagline: string;
	description: string;
	accent: string; // CSS color
	logo: string;
	status: AppStatus;
	features: string[];
	openSource?: boolean;
	externalUrl?: string;
	ctaLabel?: string;
}

/** Commercial core of the suite */
export const CORE_APPS: AppInfo[] = [
	{
		id: "timestudy",
		name: "TimeStudy",
		prefix: "LS.TimeStudy",
		tagline: "Work measurement & cycle time analysis",
		description:
			"Capture and analyse industrial cycle times and work elements on the shop floor. Build standardised work from real observation data.",
		accent: "#c00000",
		logo: "/assets/logos/ls-timestudy.svg",
		status: "available",
		features: [
			"Element time capture",
			"Rating & allowances",
			"Standardised work sheets",
			"Syncs with LS.Video timelines",
		],
	},
	{
		id: "mapper",
		name: "Mapper",
		prefix: "LS.Mapper",
		tagline: "Value stream & process mapping",
		description:
			"Map current and future-state value streams. Lead-time ladders, inventory, and kaizen bursts in a clean workbench.",
		accent: "#e97132",
		logo: "/assets/logos/ls-mapper.svg",
		status: "coming",
		features: [
			"Current / future state VSM",
			"Takt & lead-time ladders",
			"Kaizen burst tracking",
			"Export-ready diagrams",
		],
	},
	{
		id: "sim",
		name: "Sim",
		prefix: "LS.Sim",
		tagline: "Discrete-event process simulation",
		description:
			"Model lines and cells before you change them. Spot bottlenecks, test buffers, and validate improvements.",
		accent: "#78206e",
		logo: "/assets/logos/ls-sim.svg",
		status: "coming",
		features: [
			"Discrete-event engine",
			"Throughput & queue models",
			"What-if scenarios",
			"Sits between TimeStudy and Mapper",
		],
	},
	{
		id: "stats",
		name: "Stats",
		prefix: "LS.Stats",
		tagline: "Quality stats & Gage R&R",
		description:
			"Capability, distributions, Gage R&R, and control charts for lean and Six Sigma quality work.",
		accent: "#c0be00",
		logo: "/assets/logos/ls-stats.svg",
		status: "coming",
		features: [
			"Capability (Cp, Cpk…)",
			"Gage R&R",
			"Histograms & probability plots",
			"Control charts",
		],
	},
];

/** Open-source supporting tools (MIT), bundled with the suite */
export const SUPPORT_APPS: AppInfo[] = [
	{
		id: "video",
		name: "Video",
		prefix: "LS.Video",
		tagline: "Batch video prep for analysis",
		description:
			"Edit and prepare process video before analysis in TimeStudy. Open source, MIT.",
		accent: "#0070c0",
		logo: "/assets/logos/ls-video.svg",
		status: "available",
		openSource: true,
		features: ["Batch trim & export", "Timeline tools", "Feeds LS.TimeStudy"],
	},
	{
		id: "speeddf",
		name: "speedDF",
		prefix: "speed",
		prefixAccent: "DF",
		titleFont: "display",
		tagline: "Local PDF editor & annotator",
		description:
			"Fast, fully local PDF markup and form fill. Own brand, open source MIT — bundled as a supporting tool.",
		accent: "#00f0ff",
		logo: "/assets/logos/speeddf.svg",
		status: "available",
		openSource: true,
		features: ["Local-only", "Annotations that bake in", "No accounts"],
		externalUrl: "https://speeddf.com",
		ctaLabel: "Visit speeddf.com",
	},
];
