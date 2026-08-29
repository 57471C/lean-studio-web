# Lean.Studio — SUITE_MAP

Living map of the Lean.Studio product family. Update when apps ship, rename, or integrate.

> **Repo note:** Keep this file at the **repository root** of `lean-studio-web` (or any suite repo). Do **not** place it under `src/routes/`, `static/`, or any public asset path — it must never be served as a site page.

**Brand:** Lean.Studio — local-first tools for process excellence (lean manufacturing / continuous improvement)  
**Site:** https://lean.studio  
**Positioning:** Measure, map, simulate, and analyse quality — shop floor through leadership views. Commercial domain tools + open-source helpers that avoid Microsoft/Adobe lock-in for everyday media and documents.

---

## Product map

### Core applications (commercial)

| App | Status | Role |
|-----|--------|------|
| **LS.TimeStudy** | Available (v0.7.3) | Element time capture, rating & allowances, trials, kaizen dashboard. Primary consumer of video timelines / markers. |
| **LS.Stats** | Available (legacy line) | Capability (Cp, Cpk), Gage R&R, histograms, probability plots, control charts. |
| **LS.Mapper** | In development / raw | Current/future-state VSM, takt & lead-time ladders, kaizen burst tracking, export-ready diagrams. **Stack not locked — plan before building.** |
| **LS.Sim** | In development | Discrete-event engine, throughput & queue models, what-if scenarios. |

### Open-source supporting tools (MIT)

| App | Repo / site | Role |
|-----|-------------|------|
| **LS.Video** | https://github.com/57471C/LS-Video · feed `https://lean.studio/lsvideo/latest.json` | Media player + hybrid linear/NLE. **v0.6.7** current; updater floor (≤0.6.6 cannot self-update). |
| **speedDF** | https://github.com/57471C/speedDF · https://speeddf.com | Local-only PDF markup. Separate brand; same suite story. |

---

## How the pieces connect

```text
Shop-floor / continuous improvement work
        │
        ├─ Measure time     → LS.TimeStudy  ←── timelines / markers / prepared clips from LS.Video
        ├─ Map flow         → LS.Mapper
        ├─ Simulate         → LS.Sim
        ├─ Quality data     → LS.Stats
        │
        └─ Supporting (OSS, local-first)
              ├─ Capture / review / trim / proxy video → LS.Video
              └─ SOPs / forms / annotated PDFs           → speedDF
```

**Intended data flow (video):**

1. Capture footage (often **H.265/HEVC**, AVI, odd containers).
2. **LS.Video** — proxy if needed, mark/loop/trim, export analysis-friendly clips.
3. **LS.TimeStudy** — time elements against prepared video.

Exact TimeStudy ↔ Video sync contract — *still open*.

---

## Distribution & licensing (commercial apps)

| Concern | Decision (2026-08) |
|---------|-------------------|
| Source | **Private** GitHub for commercial apps (TimeStudy done). MIT only on Video / speedDF. |
| License file | Proprietary “all rights reserved” + `NOTICE` for FFmpeg. Does not un-MIT old public clones. |
| First install | Not a public GH Release page. |
| In-app updates | `https://lean.studio/<slug>/latest.json` |
| Binary hosting | **Cloudflare R2** at `https://downloads.lean.studio/<slug>/<tag>/<file>` — **not** Pages. |
| Manifest | lean-studio-web proxies GH `latest.json` (token required for private repos) and **rewrites** TimeStudy `platforms.*.url` to R2. |
| GH `/releases/latest` | Ignores **drafts**. Must **Publish** and set as latest. |
| Private GH assets | Use **assets API** + `Accept: application/octet-stream`, not `browser_download_url`. |
| Payments / keys | **Lemon Squeezy** intended. Store **not approved** as of 2026-08. Re-apply with live `https://lean.studio/timestudy`. Until then: **stub keys** (`LS-DEV-…`). |
| License gate UX | Cold-start wall before project/video. Persist key + instance_id. Offline grace. |

### Feeds

| App | Feed | Binaries | Repo |
|-----|------|----------|------|
| LS.Video | `https://lean.studio/lsvideo/latest.json` | Public GH Releases | `57471C/LS-Video` (public) |
| LS.TimeStudy | `https://lean.studio/timestudy/latest.json` | R2 `downloads.lean.studio/timestudy/v…/` | `57471C/LS-TimeStudy` (private) |
| speedDF | product site | as today | `57471C/speedDF` |
| Future commercial | `https://lean.studio/<slug>/latest.json` | R2 `downloads.lean.studio/<slug>/` | private repo |

### TimeStudy identity (filled 2026-08-28)

| Field | Value |
|-------|--------|
| Repo | `https://github.com/57471C/LS-TimeStudy` (**private**) |
| Identifier | `com.timestudy.desktop` (legacy; LS rename later) |
| Product page | `https://lean.studio/timestudy` |
| Current line | **v0.7.3** (updater + CI + R2). Toast test needs **v0.7.4**. |
| FFmpeg | Same static sidecars as Video (`ffmpeg-n9.0-lsvideo`) |
| Signing | Own minisign keypair. Apple secrets reused (Gabriella / `X45RX8F588`). |

---

## Auto-update (all Tauri suite apps)

Shared contract. Reference: **speedDF** (toast UX) + **LS.Video** (feed + CI) + **TimeStudy** (private repo + R2).

1. Unique minisign keypair per app
2. `createUpdaterArtifacts` + pubkey in `tauri.conf`
3. External `boot-updater.js` (no inline module)
4. Toast: Cancel | Now | When I close
5. First install = DMG/NSIS; updater = `.app.tar.gz` / matching archive
6. Commercial: publish GH release (can stay private) **and** copy bins to R2; feed rewrites URLs

**LS.Video floor:** v0.6.7 first line that can reach the feed. ≤0.6.6 need a manual DMG once.

---

## LS.Video lineage (agents)

- Fork of TimeStudy video/timeline stack; do **not** put time-study UI back into Video.
- Residual: `lfvideo_project` (migrates `timeStudyData`); Rust still `load_tspz_bundle` / `save_tspz_bundle`; `.lsv`/`.lsvz` (+ legacy `.tmv`/`.tmvz`).
- H.265 / hard media: Rust `verify_and_prepare_video` + **static** ffmpeg sidecar only.
- v0.6.7: master vs per-clip volume; muted export `-an`; deferred zoom regen; probe cache.

---

## LS.Mapper — planning notes (2026-08-29)

**Do not clone TimeStudy/Video as the starting architecture.** VSM is a diagram + data-on-edges problem, not a media player.

Open choices (decide before a pile of canvas code):

- File format (JSON document vs packed project)
- Renderer: SVG vs canvas vs existing diagram kit
- Process boxes + inventory triangles + data boxes as first-class objects (not generic flowchart)
- Current vs future state as two maps or layers
- How TimeStudy cycle times land on a process box later
- Same Tauri + vanilla JS shell vs a lighter canvas-first UI
- Commercial / private / R2 / stub-license — copy TimeStudy *ops*, not its monolith

Chip away at **information model + one map canvas**, not CI/R2 first.

---

## Cross-cutting principles

- Local-first — no required cloud account for core workflows.
- Tauri + vanilla JS is proven; new frameworks need a reason (Mapper might be that reason — decide explicitly).
- OSS the utilities; commercialize domain tools.
- Agent workflow: branch → PR → delete **local** branch only; copy-paste commit messages.

---

## Identity cheat sheet

| App | Notes |
|-----|--------|
| LS.Video | `com.leanstudio.lsvideo`, feed `/lsvideo/latest.json`, **v0.6.7** |
| speedDF | Own brand/site |
| LS.TimeStudy | `com.timestudy.desktop`, private repo, feed `/timestudy/latest.json`, bins on R2, **v0.7.3** |
| LS.Mapper | *Not locked — identifier `com.leanstudio.lsmapper` suggested* |

---

## Gaps to fill (owner)

- [ ] TimeStudy ↔ Video integration contract
- [ ] TimeStudy in-app H.265 proxy vs shell to LS.Video
- [ ] Lemon store re-apply + pricing
- [ ] TimeStudy license wall (stub first)
- [ ] TimeStudy updater toast test (tag 0.7.4)
- [ ] Mapper information model + renderer choice
- [ ] Sim ship target
- [ ] speedDF long-term name
- [ ] Shared design tokens

---

## Related deep docs

| Doc | Where |
|-----|--------|
| LS.Video agent map | `AGENT_MAP.md` in LS-Video |
| LS.Video architecture | `ARCHITECTURE_NUANCES.md` in LS-Video |
| This suite map | `lean-studio-web` repo root — **not** a public route |

---

*Refreshed 2026-08-29: TimeStudy v0.7.3 private + R2 + Lemon pending; Mapper planning flag.*
