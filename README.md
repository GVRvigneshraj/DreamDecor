# Magic Decor

Wedding, Birthday, Corporate & Event Decoration Management website.

## Folder structure

```
DreamDecor-main/
├── index.html
├── README.md
└── assets/
    ├── images/
    │   ├── logo.png                            ✅
    │   ├── hero/
    │   │   └── main-wedding-decor.jpg          ✅ AI-generated (4:4.4)
    │   ├── backdrops/
    │   │   ├── wedding-mandap.jpg              ✅ AI-generated (4:3)
    │   │   ├── birthday-balloons.jpg           ✅ jungle safari birthday
    │   │   ├── corporate-stage.jpg             ✅ AI-generated (4:3)
    │   │   └── custom-theme.jpg                ✅ AI-generated (4:3)
    │   ├── about/
    │   │   ├── wedding.jpg                     ✅ AI-generated (1:1.15)
    │   │   ├── engagement.jpg                  ✅ AI-generated (1:1.15)
    │   │   ├── birthday.jpg                    ✅ jungle safari birthday
    │   │   └── corporate.jpg                   ✅ AI-generated (1:1.15)
    │   ├── services/
    │   │   ├── wedding.jpg                     ✅ AI-generated card bg (4:3)
    │   │   ├── birthday.jpg                    ✅ AI-generated card bg (4:3)
    │   │   ├── corporate.jpg                   ✅ AI-generated card bg (4:3)
    │   │   ├── baby.jpg                        ✅ AI-generated card bg (4:3)
    │   │   ├── engagement.jpg                  ✅ AI-generated card bg (4:3)
    │   │   └── custom.jpg                      ✅ AI-generated card bg (4:3)
    │   └── gallery/
    │       ├── wedding/
    │       │   └── royal-mandap.jpg            ✅ AI-generated (1:1.05)
    │       ├── birthday/
    │       │   ├── princess-night.jpg          ✅ pink princess, indoor/outdoor night
    │       │   └── black-gold-night.jpg        ✅ black & gold balloon birthday
    │       ├── corporate/
    │       │   └── corporate-stage.jpg         ✅ AI-generated (1:1.05)
    │       └── other/
    │           ├── baby-shower-pastel.jpg      ✅ pastel blue/green, sofa, "Little One Big Love"
    │           └── baby-shower-traditional.jpg ✅ traditional yellow, "Little One Big Blessing"
    ├── css/style.css
    ├── js/main.js
    └── js/ai-preview.js
```

## Image map — original file → content → path

| Original file | Actual content (analyzed) | Final path | Status |
|---|---|---|---|
| `BabyShower 1.jpeg` | Pastel baby shower (sofa, blue/green) | `gallery/other/baby-shower-pastel.jpg` | ✅ |
| `BabyShower 2.jpeg` | Traditional baby shower (yellow flowers) | `gallery/other/baby-shower-traditional.jpg` | ✅ |
| `HappyBirthday 1.jpeg` | Pink princess birthday night | `gallery/birthday/princess-night.jpg` | ✅ |
| `HappyBirthday 2.jpeg` | Black & gold balloon birthday | `gallery/birthday/black-gold-night.jpg` | ✅ |
| `HappyBirthday 3.jpeg` | Jungle safari 1st birthday (day/night) | `backdrops/birthday-balloons.jpg` | ✅ |
| `HappyBirthday 4.jpeg` | Jungle safari 1st birthday (about grid) | `about/birthday.jpg` | ✅ |

## AI-generated slot fills (all present)

Previously missing paths were filled with free AI-generated photos (Pollinations/Flux), cropped to remove free-tier watermarks:

```
assets/images/hero/main-wedding-decor.jpg          ✅
assets/images/backdrops/wedding-mandap.jpg         ✅
assets/images/backdrops/corporate-stage.jpg        ✅
assets/images/backdrops/custom-theme.jpg           ✅
assets/images/about/wedding.jpg                    ✅
assets/images/about/engagement.jpg                 ✅
assets/images/about/corporate.jpg                  ✅
assets/images/gallery/wedding/royal-mandap.jpg     ✅
assets/images/gallery/corporate/corporate-stage.jpg ✅
```

All `<img>` tags still keep `onerror="this.remove()"` as a safety net.

## Gallery — 6 items (full)

| # | Category | Caption | Image path | Filter chip |
|---|---|---|---|---|
| 1 | Wedding | Royal Mandap | `gallery/wedding/royal-mandap.jpg` | Wedding |
| 2 | Birthday | Princess Night | `gallery/birthday/princess-night.jpg` | Birthday |
| 3 | Birthday | Black Gold Night | `gallery/birthday/black-gold-night.jpg` | Birthday |
| 4 | Baby Shower | Baby Shower Pastel | `gallery/other/baby-shower-pastel.jpg` | Baby Shower |
| 5 | Baby Shower | Baby Shower Traditional | `gallery/other/baby-shower-traditional.jpg` | Baby Shower |
| 6 | Corporate | Corporate Stage | `gallery/corporate/corporate-stage.jpg` | Corporate |

Filters: All · Wedding · Birthday · Baby Shower · Corporate.

## Services cards (emoji icons)

All 6 service cards use attractive emoji icon badges (👰 🎈 🎤 🍼 💍 🎨) on light tinted cards — no photo backgrounds. Each card has a colored gradient emoji tile, hover lift and gold accent border.

## AI Preview — Decor My Hall (`#ai-preview`)

Free AI image-to-image preview using [Puter.js](https://docs.puter.com/) (no API key, no server — user-pays model; free for the site owner).

Flow: customer uploads/captures a room photo → picks a theme (Wedding / Birthday / Corporate / Baby Shower / Engagement / Custom) → optional note → `puter.ai.txt2img` with `input_image` (Gemini image model, fallback GPT-image mini) → result shown with Download + WhatsApp “Book this look”.

Files: section in `index.html`, styles `sec-ai` / `ai-grid` in `style.css`, logic in `assets/js/ai-preview.js`, Puter script loaded in `<head>` (`https://js.puter.com/v2/`).

Notes: images are downscaled client-side to 1024px JPEG before send; first use may show a free Puter sign-in popup; result is an artistic preview, not a materials quote. Rate/credit errors surface friendly messages in `#aiStatus`.

## Customer Reviews

Auto-scrolling marquee (right → left) in `#reviews`. Sample cards are duplicated (`aria-hidden` second group) for a seamless loop; pause on hover. Replace text in `index.html` under `<!-- CUSTOMER REVIEWS -->` with real feedback.

## Section background patterns

Each section has a unique `::before` pattern (style.css): hero sparkle dots · services grid · backdrops rings · about leaves · gallery diamonds · reviews quotes · CTA dots · contact glowing plus-grid · AI preview sparkle dots.

## Still needed

No pending image slots — every mapped path exists.

Optional upgrades: replace AI-generated fills with real photos when available (keep same filenames/ratios); swap sample reviews for real customer feedback.
