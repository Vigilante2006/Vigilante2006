# Setup Guide

Deploy this profile to your GitHub account in a few minutes.

## Prerequisites

- A GitHub account: [Vigilante2006](https://github.com/Vigilante2006)
- A repository named **exactly** `Vigilante2006` (same as your username)
- The repository must be **public**

## Quick Deploy

1. Create or open the repository: `https://github.com/Vigilante2006/Vigilante2006`
2. Copy all files from this project into the repository root
3. Commit and push to the `main` branch
4. Visit `https://github.com/Vigilante2006` — the README renders on your profile

## Repository Structure

```
Vigilante2006/
├── README.md              # Main profile (renders on GitHub)
├── svg/                   # Original animated SVG artwork
├── icons/                 # Breathing style icons
├── assets/                # Optional static assets
├── .github/workflows/     # Automation (snake, activity feed)
└── documentation/         # Setup and customization guides
```

## Contribution Snake

The snake animation requires a GitHub Actions workflow.

### Steps

1. Create `.github/workflows/snake.yml`:

```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Platane/snk@v3
        with:
          github_user_name: Vigilante2006
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - uses: actions/upload-artifact@v4
        with:
          name: snake
          path: dist
      - uses: devicons/snake-output@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          output_path: output/github-contribution-grid-snake.svg
```

2. Push the workflow file
3. Go to **Actions** → **Generate Snake** → **Run workflow**
4. After it completes, the snake SVG appears at `output/github-contribution-grid-snake.svg`

## Live Activity Feed

For auto-updated recent activity, add `.github/workflows/activity.yml`:

```yaml
name: Update Activity

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

jobs:
  activity:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: JamesIves/github-readme-activity-log@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The workflow replaces content between `<!--START_SECTION:activity-->` and `<!--END_SECTION:activity-->` in README.md.

## Pinning Repositories

On GitHub:

1. Go to your profile → **Customize your pins**
2. Pin these repositories (matching your current profile):
   - spotifyGlassCard
   - kalyanam.github.io
   - Spotify_Single_Page.github.io
   - netflixClone.github.io
   - FormWithLocalStorage
   - flag

## Profile Photo

Your current avatar is already set. For best results with this theme, use a high-contrast image with a dark or anime-inspired aesthetic.

## Troubleshooting

| Issue | Fix |
|:------|:----|
| README not showing on profile | Repo must be public and named exactly like your username |
| Snake image broken | Run the snake workflow once; check Actions tab |
| Stats cards empty | External APIs may rate-limit; wait and refresh |
| SVG animations not playing | GitHub renders SVG via `<img>` — animations work in supported browsers |
| Typing animation not loading | Check `readme-typing-svg.demolab.com` availability |

## External Services Used

- [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards)
- [Streak Stats](https://github.com/DenverCoder1/github-readme-streak-stats)
- [Activity Graph](https://github.com/Ashutosh00710/github-readme-activity-graph)
- [Skill Icons](https://github.com/devicons/devicon)
- [Profile Trophy](https://github.com/ryo-ma/github-profile-trophy)
- [Typing SVG](https://github.com/DenverCoder1/readme-typing-svg)
- [Visitor Counter](https://github.com/antonkomarev/github-profile-views-counter)

All services are free and require no API keys for basic usage.
