# Design Brief — Google Play Feature Graphic
**App: دليل اللاذقية (Lattakia Guide)**

## 1. Deliverable
- **Asset:** Google Play Store "Feature Graphic" (the wide promotional banner shown when Google features/promotes the app — category banners, "Editor's Choice" placements, "You might like" carousels).
- **Exact spec:** 1024 × 500 px, PNG or JPEG, ≤ 15 MB, RGB (no alpha/transparency — this is a flat banner, not an icon).
- **Safe zone:** Keep all critical content (logo, text) at least ~40–50px inside every edge — some Play Store surfaces crop or overlay UI chrome (like a play button) near the edges/center, especially the bottom-left corner.
- A previous programmatic attempt (flat gradient + generic rounded "chip" pills + scattered pin-icon confetti pattern) felt cheap/generic and was rejected. **Avoid that "corporate template" look** — aim for something that feels like a professionally art-directed app-store hero banner (think: the kind of banner a top-20 travel/local-discovery app would ship), not a placeholder mockup.

## 2. What the app actually is (ground truth — do not invent features beyond this)
"دليل اللاذقية" (Lattakia Guide) is a **local places & services directory app** for the coastal Syrian city of **Lattakia** ("عروس الساحل" — "Bride of the Coast" is the city's well-known nickname, evocative of its Mediterranean coastline). Core things it actually does, confirmed from the real codebase:
- Browse/discover local places across ~76 categories: restaurants, cafés, shops, hotels, clinics, services, etc.
- Search for places and services.
- "Mushwar" (مشوار) — a playful random-suggestion feature: tap a button, get a place suggested based on mood/category, for when you can't decide where to go.
- Save favorite places.
- Business owners can add/claim/manage their own place listing (photos, products, hours).
- A lightweight local job board: post a job opening, or apply with an uploaded CV/resume.
- Local news & events feed.
- Guest mode (browse without an account) + full account mode.

There is **no GPS/live-navigation feature** — do not depict live turn-by-turn navigation, live user location dots, or "near me" GPS UI. It is a browsable directory + map-pin business locations (owner-entered), not a nav app.

## 3. Brand identity

### Logo
- File: `C:\Users\G\StudioProjects\Lattakia_Guide\app\src\prodRelease\ic_launcher-playstore.png` (512×512 PNG — this is the official Play Store icon file, exported on a flat opaque white square background, so treat the white as background-to-remove, not a design element).
- Also available as adaptive-icon vector layers (for a clean vector redraw if needed):
  - `C:\Users\G\StudioProjects\Lattakia_Guide\app\src\prodRelease\res\drawable\ic_launcher_foreground.xml`
  - `C:\Users\G\StudioProjects\Lattakia_Guide\app\src\prodRelease\res\drawable\ic_launcher_background.xml`
- **Logo description:** A classic map-location-pin silhouette (rounded teardrop shape, point down), dark navy blue (`#1a3f7c`-ish), containing a lighter powder-blue circle, with a dark-navy **ship's anchor** icon centered inside the circle, and a two-tone blue wavy "sea" motif crossing the bottom third of the circle (a lighter blue wave over a mid-blue wave). The anchor + waves are the emblem of the city's maritime/coastal identity; the pin shape signals "place directory."
- Use the logo as-is (recolor/relight/add a subtle glow or reflection if it helps the composition), but **do not redesign the mark itself** — keep the pin + anchor + waves recognizable and proportioned as in the source file.

### Color palette (extracted from the app's own live website, hex-exact — use these, not approximations)
| Role | Hex | Notes |
|---|---|---|
| Primary brand blue | `#1A5C8A` | used as the main brand blue on legal/info pages |
| Primary blue (site variant) | `#1a3f7c` | used on the marketing homepage — both blues are "the brand," pick one family and stay consistent, don't mix both in one banner |
| Deep navy | `#0e2450` / `#0A1838` | for dark gradient ends, shadows, depth |
| Mid/bright blue | `#2478B5` / `#30A5E8` | gradient highlights, energy accents |
| Gold/amber accent | `#E8A020` | the app's ONE accent color — used sparingly for highlights, dividers, badges. This is the "premium" accent — lean into it more than the previous flat attempt did |
| Light accent tint | `#FEF3DC` | soft gold tint for light-mode surfaces |
| Off-white background | `#F7F8FA` / `#f4f8f7` | app's light neutral background, if a light-toned layout is preferred over a dark navy one |
| Ink/text | `#1C1E26` / `#141c1b` | near-black text on light surfaces |

**Mood:** trustworthy, modern, warm-but-professional, distinctly Mediterranean-coastal (not generic "tech startup blue") — think golden-hour coastal light meeting deep navy sea, not flat corporate gradient.

### Typography
- **Font: Cairo exclusively — every piece of text on this banner (title, tagline, badge) must be set in Cairo. Do not use Tajawal, Tahoma, Arial, or any other font on this asset, even for smaller/secondary text.** (Cairo is the app's Arabic display font, Google Fonts, weights 400–900 available — use a heavy weight, e.g. 800–900, for the title, and a lighter weight, e.g. 400–600, for the tagline, but it must stay the Cairo family throughout.)
- All copy is **Arabic, right-to-left**. If you render text as pixels (not live text), the Arabic must be properly shaped/joined (correct contextual letterforms) and reading right-to-left — broken/disconnected Arabic letterforms are an automatic reject.

## 4. Required text content (use verbatim — do not translate or alter the Arabic)
- **App name / hero title (must be the most prominent text):** `دليل اللاذقية`
- **Tagline (pick one, or write a tighter original in the same voice/length):**
  - `اكتشف أفضل الأماكن والخدمات والوظائف في اللاذقية`
  - or shorter: `مرجعك الأول لاكتشاف مدينتك`
- **Optional small location badge/tag:** `عروس الساحل` (the city's nickname — nice flavor detail, not mandatory)
- Do NOT add a call-to-action button graphic like "Download now" — Play Store already surrounds this banner with its own install UI; a fake button reads as amateurish.

## 5. Art direction / composition guidance
- The logo (pin + anchor + waves) should be a clear focal point but should feel **integrated into the scene**, not pasted on top of a plain gradient like a sticker. Consider: a soft light source/glow emanating from behind it, subtle reflections, a sense of depth (foreground logo, midground title, background atmospheric texture).
- Consider a **coastal/Mediterranean atmosphere** in the background — abstracted, not literal/photographic: e.g. soft wave-line silhouettes echoing the logo's own wave motif, a horizon-line composition (navy "sky" gradient meeting a slightly different navy "sea" band), soft bokeh-like light dots (evoking city lights or sunlight on water), rather than a flat two-color gradient.
- Keep it **calm and premium, not busy** — this previous attempt over-decorated with scattered outline pin icons as a repeating background pattern, which read as cheap "pattern fill" rather than intentional design. If you use any repeating motif, make it much more subtle (near-invisible texture) or drop it in favor of a cleaner atmospheric background.
- Gold accent (`#E8A020`) should appear as one or two deliberate, elegant touches (e.g. a thin rule under the title, a warm rim-light on the logo, a small badge outline) — not multiple competing gold elements.
- Composition direction: logo positioned left or right (RTL audience — many designers place the anchor of attention on the right, with the logo balancing on the left, since Arabic reading starts top-right), title + tagline stacked, generous negative space, nothing touching the outer safe-zone margin.

## 6. Reference material for visual language
Live site pages using this exact brand system (for gradient/style reference, all under `C:\Users\G\Desktop\lattakia-site\`):
- `index.html` — homepage header gradient (`linear-gradient(160deg, #1a3f7c 0%, #0e2450 100%)`) and card style
- `Data-Safety-Declaration.html` / `delete-account.html` / `contact.html` — the `#1A5C8A → #2478B5 → #30A5E8` hero gradient with a soft wave SVG at the header's base (`site-header::before`), gold accent underline style (`.header-divider`), and badge/pill styling (`.header-badge`, `.highlight-box`)

## 7. Output
Save the final approved banner as a flat PNG, exactly 1024×500px, no transparency, to:
`C:\Users\G\Desktop\lattakia-site\assets\feature_graphic_1024x500.png`
(overwrite the placeholder currently there).
