# 02 — ENGINE INTELLIGENCE

Never assume that PixiJS means 2D or that a 3D game requires Three.js.

First inspect the existing architecture.

Technology classification

A. PixiJS 2D
B. PixiJS pseudo-3D
C. PixiJS custom perspective rendering
D. PixiJS + @pixi/3d
E. PixiJS + Three.js
F. Babylon.js
G. Other hybrid architecture

Rendering decision

Choose technology according to:

1. Existing project architecture
2. Required 3D capabilities
3. Browser compatibility
4. Target device performance
5. Asset pipeline
6. Engineering complexity
7. Maintenance risk

PixiJS 3D

Understand:

- View3D
- Mesh3D
- Geometry3D
- Material3D
- Camera3D
- Lighting
- Shadow systems
- glTF loading
- Skinned animation
- Morph targets
- Particles
- Post-processing
- BatchedMesh3D
- Frustum culling

Treat @pixi/3d as an open-beta dependency according to its published project status.

Verify the actual installed version, peer dependencies, release status, API and browser compatibility before implementation.

Do not assume the API remains identical across beta releases.

Renderer selection

WebGL2:

- Stable production baseline.
- Broad browser compatibility.
- Must be included in compatibility testing.

WebGPU:

- Evaluate for supported hardware.
- Verify required GPU features.
- Check browser implementation.
- Test fallback behavior.
- Do not assume it is universally faster.

Never force a renderer without testing its actual availability.

# 06 — MATERIAL & ASSET PIPELINE

Understand:

- glTF / GLB
- PBR metallic-roughness
- Toon materials
- Flat materials
- Normal maps
- Texture atlases
- KTX2 / Basis Universal
- Draco
- Meshopt
- Geometry quantization

Inspect:

- Mesh count
- Material count
- Texture dimensions
- Texture memory
- Animation tracks
- Compression
- Unused assets

Choose compression based on actual visual and runtime trade-offs.

Never compress assets blindly.

Validate compressed output on target devices.

# 07 — LIGHTING & POST-PROCESSING

Implement appropriate lighting and effects.

Lighting:

- Directional
- Point
- Spot
- Ambient
- Environment lighting

Shadows:

- Shadow resolution
- Shadow filtering
- Shadow bounds
- Shadow artifacts
- Contact shadows

Post-processing:

- Bloom
- SSAO
- FXAA
- Outlines
- Vignette
- Color grading
- Depth effects
- Custom shaders

Every effect must have:

- Visual purpose
- Performance cost
- Compatibility assessment
- Quality setting
- Fallback strategy

Avoid stacking unnecessary full-screen effects.

# 08 — CHARACTER & ANIMATION

Evaluate:

- Character silhouette
- Proportions
- Materials
- Animation transitions
- Motion timing
- Physical weight

Implement where appropriate:

- Idle
- Walk
- Run
- Jump
- Fall
- Landing
- Death
- Victory
- Interaction

Use:

- Anticipation
- Follow-through
- Squash and stretch
- Easing
- Secondary motion
- Momentum
- Procedural animation

Prioritize control responsiveness and gameplay readability.

# 09 — CAMERA & GAME FEEL

Analyze:

- Field of view
- Perspective
- Follow camera
- Look-ahead
- Camera bounds
- Smoothing
- Camera collision
- Screen shake
- Cinematic transitions

For platformers prioritize:

- Forward visibility
- Obstacle visibility
- Landing visibility
- Player positioning
- Predictable movement

Camera effects must not interfere with player control.

# 10 — VFX ARCHITECT

Build a reusable effect library.

Movement:

- Dust trails
- Speed trails
- Jump particles
- Landing dust

Interaction:

- Sparks
- Impact rings
- Collectible bursts
- Destruction effects

Environment:

- Rain
- Snow
- Fog
- Wind
- Ambient particles

Feedback:

- Hit flash
- Camera shake
- Reward effects
- Level completion

Use object pooling for frequently spawned particles.

Control particle budgets and avoid excessive overdraw.

# 12 — PERFORMANCE INTELLIGENCE

Mandatory principle:

PROFILE FIRST. OPTIMIZE SECOND.

Measurement

Capture:

- Average FPS
- Frame-time distribution
- P50 frame time
- P95 frame time
- Long frames
- CPU workload
- GPU workload where measurable
- Draw calls
- Texture memory
- Asset loading duration

Distinguish between CPU-bound, GPU-bound, memory-bound and loading-bound problems.

PixiJS optimization knowledge

Use where appropriate:

- Object pooling
- Texture garbage collection
- PrepareSystem
- cacheAsTexture
- BitmapText
- Texture atlases
- CullerPlugin
- Geometry reuse
- Material reuse
- BatchedMesh3D
- Frustum culling
- Resolution scaling
- Render pass reduction

Understand trade-offs.

Examples:

- Culling saves GPU work but may add CPU overhead.
- Cache-as-texture saves repeated rendering but consumes memory.
- High resolution increases pixel workload.
- Post-processing introduces additional render passes.
- Excessive object creation creates garbage collection pressure.

Never apply every optimization simultaneously.

Select only those supported by profiling evidence.

# 13 — DEVICE PROFILES

Define target configurations.

High-end desktop

Prioritize visual quality while maintaining stable frame delivery.

Standard desktop

Balance lighting, shadows, geometry and post-processing.

Mid-range mobile

Control resolution, particles, texture memory and shadows.

Low-end mobile

Reduce expensive effects and maintain essential gameplay readability.

Support:

- Responsive rendering
- Resolution scaling
- Quality presets
- Reduced-motion settings
- Safe fallback behavior

Never promise universal 60 FPS.

Measure actual devices.
