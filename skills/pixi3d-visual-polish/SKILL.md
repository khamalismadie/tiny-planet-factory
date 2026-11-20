---
name: pixi3d-visual-polish
description: Audits and polishes browser 3D game visuals with a profile-first, evidence-driven pipeline. Use when the user asks to audit, review, or improve visuals for a PixiJS, @pixi/3d, Three.js, or Babylon.js game — including 'audit my 3D game', 'review my visuals', 'polish this PixiJS 3D scene', 'art direction', 'visual QA', 'frame time p95', or 'game feel' — even if they do not name the stack. Produces a prioritized defect report, art direction spec, incremental implementation, measured validation, and three independent quality scores.
compatibility: Requires repository and execution access for verified audits; screenshots and device telemetry strengthen findings but are not required.
metadata:
  source-version: 1.3.0
  original-authority: Expert Baseline
---

# PixiJS 3D Visual Polish Architect

Principal rendering engineering plus AAA art direction for browser games. Transforms an existing 3D web game into a distinctive, technically sound, commercially polished experience through DISCOVER → AUDIT → DESIGN → IMPLEMENT → PROFILE → VALIDATE → REFINE. Every change must have purpose, evidence, acceptance criteria, and preserved gameplay.

## Instructions

1. Discover before coding. Inspect the repository, installed dependencies, rendering systems and assets. Classify the architecture as PixiJS 2D, pseudo-3D, custom perspective, PixiJS + @pixi/3d, PixiJS + Three.js, Babylon.js, or hybrid. Verify the actual installed package version, peer dependencies, release status, API and browser compatibility before importing any 3D API. Never assume PixiJS means 2D or that 3D requires Three.js.
2. Record a baseline. Capture current screenshots at the same camera, resolution and scene state before changing anything. Record build/test status and measured frame-time distribution (p50/p95), draw calls and load time when execution is available. Label anything not actually measured as an estimate or assumption.
3. Perform a professional visual audit across composition, depth, geometry, materials, lighting and UI. Detect floating objects, z-fighting, clipping, wrong depth, texture stretching, aliasing, shadow artifacts, unwanted transparency, visual noise and UI overlap. For every defect record evidence, severity, root cause, gameplay impact, proposed correction and acceptance criteria. Never invent a defect.
4. Establish the art direction before decoration: color palette, shape language, geometry standards, material standards, lighting direction, environment style, character proportions, animation language, camera language, VFX language and UI system. Create reusable standards so every new asset matches them.
5. Prioritize candidates with scripts/priority_score.py using Visual Impact × Gameplay Impact × Confidence divided by Implementation Cost × Regression Risk (all 1–5). Fix critical defects first, then highest-value improvements; do not spend time on insignificant detail.
6. Implement incrementally while preserving mechanics, collision, physics, input, level logic, save systems and existing functionality. Prefer geometry/material reuse, batching, pooling and quality budgets only where profiling evidence supports them. Each effect needs a visual purpose, performance cost, compatibility assessment, quality setting and fallback. Avoid unnecessary migrations and stacked full-screen effects.
7. Validate every change: type checking, build, unit tests, integration tests, browser tests, gameplay regression, visual comparison at equivalent camera/state, and performance checks. Use scripts/quality_score.py for three independent scores (Visual, Technical, Gameplay Integrity). Weighted scores never replace release gates such as successful build, no critical regressions, working core gameplay and target-device compatibility.
8. Deliver a report with executive summary, rendering architecture, technology compatibility, visual assessment, technical assessment, gameplay integrity, defect report, art direction specification, implementation roadmap, performance findings, regression risks and acceptance criteria. After implementation also list files modified, changes delivered, tests executed, results, measured performance, remaining defects and the three scores. Separate verified facts, estimates and assumptions. Never claim a phase passed when it was not executed.

## References

- [Visual audit, art direction and visual comparison](references/visual-audit.md) — Load when judging composition, defects, art identity, worlds or before/after screenshots.
- [Rendering, assets, animation, VFX, performance and device profiles](references/rendering-performance.md) — Load when choosing renderer/APIs, building effects, or optimizing with profile evidence.
- [Autonomous workflow, priority, scoring and reporting](references/execution-reporting.md) — Load to run the full pipeline and produce the final evidence-backed report.

## Scripts

- `priority_score.py`: Run it; do not read the source into context.
- `quality_score.py`: Run it; do not read the source into context.

## Guidelines

- PROFILE FIRST. OPTIMIZE SECOND. Distinguish CPU-bound, GPU-bound, memory-bound and loading-bound problems.
- Verify dependencies before importing APIs; @pixi/3d is open beta and its API may drift between releases.
- WebGL2 is the stable production baseline; evaluate WebGPU only with tested availability and fallback behavior.
- Never promise universal 60 FPS. Respect the declared target hardware and measure real devices.
- Every visual effect needs a purpose, cost, compatibility check, quality setting and fallback.
- Use object pooling and particle budgets; avoid excessive overdraw and unnecessary full-screen passes.
- Create reusable visual standards instead of one-off decoration.
- Separate verified facts, estimates and assumptions in every report.

## Edge cases

- If no repository access is available, deliver an audit/spec only and explicitly label it as unverified.
- If screenshots are unavailable, do not claim visual improvements; describe expected changes instead.
- If the headless browser reports WebGL context loss, flag it and require real-device verification.
- If @pixi/3d API differs from documentation, trust the installed package types and adapt without forcing a migration.
- If target hardware is unavailable, report desktop results as such and keep mobile performance claims as estimates.
