# Design Brief

## Direction

Warm Embrace — an elegant, warm-toned Mother's Day tribute with refined serif typography, celebratory gradient background, and heartfelt animations.

## Tone

Romantic elegance with celebratory warmth — refined and emotional, never kitschy or overstated.

## Differentiation

Radial gradient hero in warm pink–coral–gold tones with character-by-character typewriter animation and a joyful confetti finale creates an unforgettable emotional moment.

## Color Palette

| Token      | OKLCH          | Role                          |
| ---------- | -------------- | ----------------------------- |
| background | 0.96 0.02 85   | Warm cream base               |
| foreground | 0.18 0.03 50   | Warm dark charcoal text       |
| primary    | 0.52 0.18 25   | Warm coral-pink accent        |
| accent     | 0.58 0.2 15    | Deep coral for highlights     |
| muted      | 0.92 0.02 85   | Light warm tint for sections  |

## Typography

- Display: Fraunces — elegant serif for headlines and hero message
- Body: General Sans — warm, refined sans-serif for body text and UI
- Scale: hero text-5xl md:text-7xl font-bold tracking-tight, label text-sm font-semibold uppercase, body text-lg

## Elevation & Depth

Warm, soft shadows with minimal depth. Smooth gradients and gentle blur effects create atmospheric mood without visual weight.

## Structural Zones

| Zone    | Background             | Border | Notes                                      |
| ------- | ---------------------- | ------ | ------------------------------------------ |
| Hero    | Radial gradient (warm) | —      | Full viewport, centered text, no padding   |
| Content | Same as hero gradient  | —      | Single centered container, generous margin |
| Footer  | Transparent            | —      | Hidden; no platform branding               |

## Spacing & Rhythm

Generous whitespace and tall line-height (1.8–2) for breathing room. Typewriter effect uses 50ms per character. Confetti finale uses 3s ease-out animation with rotating particles.

## Component Patterns

- Text: Centered, serif headline with elegant body copy
- Animations: Typewriter (character-by-character), confetti fall with rotation, bloom glow fade
- No buttons or interactive controls

## Motion

- Typewriter: Character-by-character reveal at 50ms intervals with cursor border
- Confetti: Random horizontal drift with 720° rotation over 3s, 1.5–2s delay after message completes
- Bloom glow: Soft blur and brightness spike (50–80px blur, 1.2× brightness) fading over 2s

## Constraints

- No footer, branding, or navigation
- Full viewport height, centered vertically and horizontally
- Warm palette only; no cool or muted tones
- Smooth, refined animations only; no jarring or bouncy effects

## Signature Detail

Radial gradient background in warm celebratory tones (pink → coral → gold) creates emotional resonance; typewriter reveal with confetti finale choreographs a heartfelt moment.
