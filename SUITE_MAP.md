# Lean.Studio — SUITE_MAP

Living map of the Lean.Studio product family. Update when apps ship, rename, or integrate.

> **Repo note:** This file is documentation only. Keep it at the **repository root** of `lean-studio-web` (or any suite repo). Do **not** place it under `src/routes/`, `static/`, or any public asset path — it must never be served as a site page.

**Brand:** Lean.Studio — local-first tools for process excellence (lean manufacturing / continuous improvement)  
**Site:** https://lean.studio  
**Positioning:** Measure, map, simulate, and analyse quality — shop floor through leadership views. Commercial domain tools + open-source helpers that avoid Microsoft/Adobe lock-in for everyday media and documents.

---

## Product map

### Core applications (commercial)

| App | Status | Role |
|-----|--------|------|
| **LS.TimeStudy** | Available | Element time capture, rating & allowances, standardized work sheets. Primary consumer of video timelines / markers. |
| **LS.Stats** | Available | Capability (Cp, Cpk), Gage R&R, histograms, probability plots, control charts. |
| **LS.Mapper** | In development | Current/future-state VSM, takt & lead-time ladders, kaizen burst tracking, export-ready diagrams. |
| **LS.Sim** | In development | Discrete-event engine, throughput & queue models, what-if scenarios. |

### Open-source supporting tools (MIT)

| App | Repo / site | Role |
|-----|-------------|------|
| **LS.Video** | https://github.com/57471C/LS-Video | Media player + hybrid linear/NLE: markers, loops, filmstrip, batch trim/export. **Video companion for TimeStudy**; also stands alone. |
| **speedDF** | https://github.com/57471C/speedDF · https://speeddf.com | Local-only PDF markup, forms, annotations. Separate brand; same suite story. |

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

1. Capture or receive footage (often surveillance / phone / shop-floor — may be **H.265/HEVC**, AVI, odd containers).
2. **LS.Video** — open, proxy if needed, mark/loop/trim, export analysis-friendly clips.
3. **LS.TimeStudy** — time elements against prepared video / shared timeline concepts.

Exact sync mechanism (shared project file vs export package vs deep link) — *fill in when implemented*.

---

## Auto-update (all Tauri suite apps)

Shared contract so every Lean.Studio / suite desktop app updates the same way. Reference implementation: **speedDF** (toast UX) + **LS.Video** (feed + CI artifacts).

### Feed contract

- Each app **GitHub Release** attaches a Tauri static updater asset named **`latest.json`** (plus matching `.sig` files when signing is enabled).
- Product sites **proxy** that asset — do not hand-edit JSON per release:

| App | Feed URL | GitHub repo polled |
|-----|----------|--------------------|
| LS.Video | `https://lean.studio/lsvideo/latest.json` | `57471C/LS-Video` |
| speedDF | Product site `latest.json` (optional mirror under lean.studio) | `57471C/speedDF` |
| Future apps | `https://lean.studio/<slug>/latest.json` | app repo |

**Proxy pattern:** SvelteKit (or equivalent) route fetches `releases/latest` → finds asset named `latest.json` → returns body with short cache (e.g. ~5 min). Prefer a GitHub token on the edge to avoid unauthenticated API rate limits.

### App requirements (every Tauri product)

1. Cargo + npm: `tauri-plugin-updater` + `tauri-plugin-process`
2. Register plugins in `lib.rs` / builder
3. **Unique minisign keypair per app** — never share private keys across products
4. `bundle.createUpdaterArtifacts: true`
5. `plugins.updater.endpoints` → that app’s feed URL only
6. `plugins.updater.pubkey` → **public** key only (safe to commit)
7. CI secrets: `TAURI_SIGNING_PRIVATE_KEY` (+ `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` if encrypted)
8. Release workflow must emit updater artifacts + upload `latest.json`
9. **UX (speedDF model):**
   - Silent `check()` after launch (main window only)
   - Toast: **Cancel** | **Now** (`downloadAndInstall` + `relaunch`) | **When I close** (background `download`, install on `onCloseRequested`)
   - Optional: critical/forced → auto install + relaunch
   - Optional settings: “check for updates on launch”
10. `.gitignore`: `*.key`, `.tauri/`, never commit private keys

### Apple / ffmpeg (media apps)

- macOS signed builds need valid `APPLE_*` secrets (cert, ID, team, password, notarization).
- FFmpeg sidecars for signed Mac apps must be **fully static** (no Homebrew dylibs) or dyld Team ID checks fail at proxy time.
- Prefer publishing sidecars under a dedicated GH Release tag (e.g. `ffmpeg-n9.0-lsvideo`), not in the git tree.

---

## LS.Video lineage (important for agents)

- **Origin:** Fork of the internal **TimeStudy** video/timeline stack (time-and-motion app). Video editing path was strong enough to split out.
- **Direction:** Strip time-study-specific ops/labour UI; keep player, markers, hybrid editor; rebrand as **LS.Video**.
- **Residual DNA (intentional for now):**
  - localStorage `timeStudyData` → migrate to `lfvideo_project`
  - Rust commands still named `load_tspz_bundle` / `save_tspz_bundle` in places
  - Legacy project extensions `.tmv` / `.tmvz` still openable; primary is `.lsv` / `.lsvz`
- **Do not** reintroduce full time-study feature set into LS.Video; integration belongs in TimeStudy ↔ Video contracts.

---

## H.265 / hard media (knowledge concentration)

**As of LS.Video v0.6.x**, production-grade handling of awkward codecs/containers lives primarily in **LS.Video**, not TimeStudy:

| Concern | LS.Video approach |
|---------|-------------------|
| WebView cannot play HEVC / some mpeg4 / odd containers | Rust `verify_and_prepare_video` + **ffmpeg sidecar** → H.264 MP4 proxy cache |
| Audio-only (mp3, etc.) | **Skip** proxy; play directly |
| Unsafe containers (avi, mkv, wmv, flv) | Proxy |
| No web-safe video line in probe | Proxy |
| UNC network paths (`\\server\share\...`) | Preserve UNC; only strip `\\?\` extended prefixes |
| Filmstrip / waveform | Custom canvas; skip on audio-only; generation token avoids stale thumbs |

**TimeStudy** (as of this map) **cannot yet rely on the same H.265 path**. Options when pivoting:

1. **Port / share** the proxy command + ffmpeg externalBin pattern into TimeStudy (preferred if TimeStudy embeds its own player).
2. **Delegate** hard files to LS.Video (open externally / export proxy path) — thinner coupling, worse UX.
3. **Extract a shared crate/sidecar** later (`lean-media-proxy`) used by both apps — right long-term, more upfront work.

Agents working on TimeStudy video playback should read LS.Video `ARCHITECTURE_NUANCES.md` + `AGENT_MAP.md` before inventing a second proxy design.

---

## Cross-cutting principles

- **Local-first** — no required cloud account for core workflows.
- **Tauri + vanilla JS** pattern is proven on LS.Video (and related apps); prefer consistency over new frameworks unless justified.
- **Open-source the utilities** (video, PDF); **commercialize the lean domain** tools.
- **Windows first** for video (WebView2 realities); Mac is a follow-on (Apple signing + arm64 ffmpeg).
- Agent workflow preference: branch off `main` → PR → delete **local** branch only; copy-paste commit messages; don’t commit generated CSS watch noise.

---

## Identity cheat sheet

| App | Notes |
|-----|--------|
| LS.Video | `com.leanstudio.lsvideo`, productName `LS.Video`, feed `/lsvideo/latest.json` |
| speedDF | Separate product/site; don’t force LS.* naming in the binary without a deliberate rebrand |
| LS.TimeStudy | *Fill: identifier, repo, version, update feed* |

---

## Gaps to fill (owner)

- [ ] TimeStudy ↔ Video integration contract (file format, IPC, export)
- [ ] Whether TimeStudy gets in-app proxy or shells out to LS.Video
- [ ] Pricing / licensing for commercial apps
- [ ] Mapper / Sim ship targets
- [ ] speedDF long-term name (stay speedDF vs LS.PDF)
- [ ] Shared design tokens across suite
- [ ] Per-app updater keypairs + secrets checklist for commercial apps
- [ ] “Check updates on launch” setting parity across apps

---

## Related deep docs

| Doc | Where |
|-----|--------|
| LS.Video agent map | `AGENT_MAP.md` in LS-Video repo |
| LS.Video architecture footguns | `ARCHITECTURE_NUANCES.md` in LS-Video repo |
| speedDF agent docs | *(link when present)* |
| TimeStudy agent docs | *(link when present)* |
| This suite map | `lean-studio-web` repo root — **not** a public route |

---

*Living document. Owner should amend anything missing or wrong. Updater section added 2026-08-16 after LS.Video v0.6.5 feed went live.*
