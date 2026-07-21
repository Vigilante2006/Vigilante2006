# Customization Guide

Personalize your Demon Slayer inspired profile without breaking readability.

## Color Palette

| Token | Hex | Usage |
|:------|:----|:------|
| Background | `#080B12` | Page base, graph backgrounds |
| Surface | `#10141D` | Secondary panels |
| Card | `#171C28` | Card backgrounds |
| Border | `#2A3242` | Dividers, outlines |
| Primary | `#EF4444` | Headlines, moon, CTAs |
| Secondary | `#14B8A6` | Links, water breathing, accents |
| Accent | `#F59E0B` | Highlights, thunder breathing |
| Text | `#F8FAFC` | Primary text |
| Muted | `#CBD5E1` | Secondary text |

When updating external stat cards, pass these colors as URL parameters where supported.

## Updating Personal Info

Edit these sections in `README.md`:

| Section | What to change |
|:--------|:---------------|
| Hero typing lines | URL in `readme-typing-svg.demolab.com` — change `lines=` parameter |
| Location / status badges | Shield URLs near the hero |
| Corps Record table | Followers, repos, member since |
| Current Mission | Three mission scroll descriptions |
| Featured Repositories | Repo names, descriptions, shield badges |
| Contact links | Portfolio URL, social links |

## Breathing Styles

Each skill category maps to a breathing style:

| Style | Category | Icon file |
|:------|:---------|:----------|
| Water | Frontend | `icons/water.svg` |
| Flame | Backend | `icons/flame.svg` |
| Thunder | Performance | `icons/thunder.svg` |
| Mist | Cloud | `icons/mist.svg` |
| Stone | Architecture / DB | `icons/stone.svg` |
| Wind | DevOps | `icons/wind.svg` |
| Love | UI/UX | `icons/love.svg` |
| Beast | Problem Solving | `icons/beast.svg` |

Update skill icons via [skillicons.dev](https://skillicons.dev) — change the `i=` parameter:

```
https://skillicons.dev/icons?i=html,css,js,react&theme=dark
```

## SVG Artwork

All artwork is original and lives in `svg/`:

| File | Purpose |
|:-----|:--------|
| `hero-banner.svg` | Animated hero with moon, mist, swordsman silhouette |
| `divider-ink.svg` | Section divider with ink-brush animation |
| `crest.svg` | Developer corps crest |
| `breathing-bar.svg` | Animated progress bar |
| `achievements-hex.svg` | Hexagonal achievement badges |

To edit animations, open any SVG and modify the `@keyframes` in the `<style>` block. Keep animations subtle (6–14s duration).

## Adding a New Repository

Copy this template in the Featured Repositories section:

```markdown
#### 🎯 [repo-name](https://github.com/Vigilante2006/repo-name)
<img src="https://img.shields.io/badge/Public-22C55E?style=flat-square" alt="Public"/>
<img src="https://img.shields.io/badge/Language-HEX?style=flat-square" alt="Language"/>
Description of the project in one or two sentences.
```

## Developer Journey Timeline

Update the ASCII timeline in Section 9 when you hit milestones. Keep entries short and chronological.

## Achievements

- Edit `svg/achievements-hex.svg` to rename hex badges
- GitHub trophies auto-update from your GitHub activity

## Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Body text is at least 16px equivalent
- [ ] Color contrast meets WCAG AA (light text on dark backgrounds)
- [ ] Links are keyboard-accessible (use `<a>` tags, not click-only divs)
- [ ] Animations are subtle and non-essential

## Performance Tips

- Prefer SVG over PNG for icons and illustrations
- Limit external API cards to 4–6 per section
- Avoid embedding large base64 images
- Use GitHub Actions sparingly (daily snake, 6-hour activity updates)

## Theme Variations

To shift from Water Breathing (teal) to Flame Breathing (red):

1. Swap `#14B8A6` → `#EF4444` in SVG gradients
2. Update graph `color=` parameter to `EF4444`
3. Change breathing bar gradient in `svg/breathing-bar.svg`

Keep one primary accent per section for visual clarity.
