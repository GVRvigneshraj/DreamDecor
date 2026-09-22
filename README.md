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
    │   │   └── main-wedding-decor.jpg          ⬜ pending
    │   ├── backdrops/
    │   │   ├── wedding-mandap.jpg              ⬜ pending
    │   │   ├── birthday-balloons.jpg           ✅ jungle safari birthday
    │   │   ├── corporate-stage.jpg             ⬜ pending
    │   │   └── custom-theme.jpg                ⬜ pending
    │   ├── about/
    │   │   ├── wedding.jpg                     ⬜ pending
    │   │   ├── engagement.jpg                  ⬜ pending
    │   │   ├── birthday.jpg                    ✅ jungle safari birthday
    │   │   └── corporate.jpg                   ⬜ pending
    │   └── gallery/
    │       ├── wedding/
    │       │   └── royal-mandap.jpg            ⬜ pending
    │       ├── birthday/
    │       │   ├── princess-night.jpg          ✅ pink princess, indoor/outdoor night
    │       │   └── black-gold-night.jpg        ✅ black & gold balloon birthday
    │       ├── corporate/
    │       │   └── corporate-stage.jpg         ⬜ pending
    │       └── other/
    │           ├── baby-shower-pastel.jpg      ✅ pastel blue/green, sofa, "Little One Big Love"
    │           └── baby-shower-traditional.jpg ✅ traditional yellow, "Little One Big Blessing"
    ├── css/style.css
    └── js/main.js
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

## Gallery — available decorations only (4 items)

| # | Category | Caption | Image path | Filter chip |
|---|---|---|---|---|
| 1 | Birthday | Princess Night | `gallery/birthday/princess-night.jpg` | Birthday |
| 2 | Birthday | Black Gold Night | `gallery/birthday/black-gold-night.jpg` | Birthday |
| 3 | Baby Shower | Baby Shower Pastel | `gallery/other/baby-shower-pastel.jpg` | Baby Shower |
| 4 | Baby Shower | Baby Shower Traditional | `gallery/other/baby-shower-traditional.jpg` | Baby Shower |

Filters: All · Birthday · Baby Shower. Pending wedding/corporate slots removed until real photos are added.

Every `<img>` has `onerror="this.remove()"` — missing files fall back to the gradient placeholder.

## Customer Reviews

Auto-scrolling marquee (right → left) in `#reviews`. Sample cards are duplicated (`aria-hidden` second group) for a seamless loop; pause on hover. Replace text in `index.html` under `<!-- CUSTOMER REVIEWS -->` with real feedback.

## Section background patterns

Each section has a unique `::before` pattern (style.css): hero sparkle dots · services grid · backdrops rings · about leaves · gallery diamonds · reviews quotes · CTA dots · contact glowing plus-grid.

## Still needed (exact names)

Gallery pending slots (not shown on site until added):

```
assets/images/gallery/wedding/royal-mandap.jpg
assets/images/gallery/corporate/corporate-stage.jpg
```

Other pending section images:

```
assets/images/hero/main-wedding-decor.jpg
assets/images/backdrops/wedding-mandap.jpg
assets/images/backdrops/corporate-stage.jpg
assets/images/backdrops/custom-theme.jpg
assets/images/about/wedding.jpg
assets/images/about/engagement.jpg
assets/images/about/corporate.jpg
```

Recommended ratios: gallery ~1:1.05 · backdrop 4:3 · about 1:1.15 · hero 4:4.4 — save as `.jpg`.
