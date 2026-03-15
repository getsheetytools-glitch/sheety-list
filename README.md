# My List — Sheety.tools PWA

A personal task manager PWA that lives at `list.sheety.tools`. Tasks are stored in your own Google Drive — nothing is stored by Sheety.tools.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app |
| `manifest.json` | PWA metadata (icons, name, theme) |
| `sw.js` | Service worker for offline support |
| `icon-192.png` | App icon (you need to add this) |
| `icon-512.png` | App icon large (you need to add this) |

## Setup

### 1. Icons
Add two PNG icons to the repo root:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

Use your Sheety.tools logo or create simple ones at [favicon.io](https://favicon.io).

### 2. Google Cloud (already done)
The Google OAuth Client ID is already embedded in `index.html`. No further setup needed unless you rotate the credential.

### 3. GitHub Pages
- Repo settings → Pages → Deploy from main branch / root
- Custom domain: `list.sheety.tools`
- Enable Enforce HTTPS once DNS propagates

### 4. DNS (Namecheap)
CNAME record:
- Host: `list`
- Value: `yourusername.github.io`

## How it works

1. User visits `list.sheety.tools`
2. Signs in with Google
3. App searches their Google Drive for a sheet called "My List"
4. If not found, creates it automatically with the correct columns
5. All tasks read/write directly to their sheet

## Sheet columns

`category | group | title | priority | due | notes | frequency | last_completed`

- `due` — date in `YYYY-MM-DD` format, for one-off tasks with a deadline
- `frequency` — Daily / Weekly / Monthly etc., for recurring tasks
- `last_completed` — `YYYY-MM-DD`, updated when user marks a recurring task done

## Email digest (optional add-on)

See the separate `send_tasks.py` script. Point it at the published CSV URL of the user's "My List" sheet and set up GitHub Actions for daily sends.
