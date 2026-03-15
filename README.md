# My Sheety List

A personal task manager PWA by [Sheety.tools](https://sheety.tools). Sign in with Google, manage your tasks from any device, and get daily email digests — all powered by your own Google Drive. No accounts, no subscriptions, no data stored by anyone but you.

---

## What's included

| File | Purpose |
|------|---------|
| `index.html` | The entire PWA app |
| `manifest.json` | PWA metadata (icons, name, theme) |
| `sw.js` | Service worker for offline fallback |
| `icon-192.png` | App icon — replace with your own |
| `icon-512.png` | App icon large — replace with your own |
| `send_tasks.py` | Optional email digest script |
| `daily_email.yml` | Optional GitHub Actions workflow |

---

## Quick start

### 1. Fork or copy this repo
Create a new **public** GitHub repository and upload all files.

> GitHub Pages requires a public repo on the free plan.

### 2. Enable GitHub Pages
Go to your repo → **Settings → Pages** → Source: **Deploy from branch → main → / (root)** → Save.

Your app will be available at `https://yourusername.github.io/your-repo-name`.

### 3. Add a custom domain (optional)
If you have a custom domain, add it in **Settings → Pages → Custom domain**. Then add a CNAME record in your DNS provider:
- **Host:** your subdomain (e.g. `list`)
- **Value:** `yourusername.github.io`

### 4. Add your icons
Replace `icon-192.png` and `icon-512.png` with your own 192×192 and 512×512 PNG icons. You can generate them for free at [favicon.io](https://favicon.io).

### 5. Open the app and sign in
Visit your GitHub Pages URL, click **Sign in with Google**, and the app will automatically create a **My Sheety List** spreadsheet in your Google Drive. That's your task database — you own it entirely.

---

## Installing to your home screen

**iPhone (Safari):**
Tap the Share button (↑) → **Add to Home Screen**

**Android (Chrome):**
Tap the three-dot menu (⋮) → **Add to Home Screen**

---

## App features

- **Categories** — create your own with custom colors and surfacing rules
- **Groups** — organize tasks within categories
- **Priority** — Critical / High / Med / Low
- **Recurring tasks** — Daily, Weekly, Monthly, etc. with snooze on completion
- **Today's Briefing** — smart daily summary with focus, rotation, and diversions
- **Overdue alerts** — tappable banner and dedicated overdue view
- **Category settings** — per-category rules like ignore weekends, skip daytime briefing, never surface in diversions

---

## Optional: Daily email digest

The email digest sends you a morning and evening summary of your tasks via Gmail. It reads directly from your Google Sheet.

### Prerequisites
- A GitHub account (you already have one if you forked this repo)
- A Gmail account to send from

### Setup

**Step 1 — Get a Gmail App Password**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2-Step Verification to be enabled)
2. Create a new app password — name it anything (e.g. "My Sheety List")
3. Copy the 16-character password

**Step 2 — Get your Google Sheet CSV URL**
1. Open your **My Sheety List** sheet in Google Drive
2. Go to **File → Share → Publish to web**
3. Select the **Tasks** sheet, format: **CSV** → click **Publish**
4. Copy the URL

**Step 3 — Update send_tasks.py**
Open `send_tasks.py` and update these lines near the top:
```python
SHEET_CSV_URL = "your-csv-url-here"
SEND_FROM     = "Your Name <youremail@gmail.com>"
SEND_FROM_ADDRESS = "youremail@gmail.com"
SEND_TO       = "recipient@gmail.com"
```

**Step 4 — Add your Gmail App Password as a GitHub Secret**
In your repo → **Settings → Secrets and variables → Actions → New repository secret**
- Name: `GMAIL_APP_PASSWORD`
- Value: your 16-character app password

**Step 5 — Add the workflow file**
Make sure `daily_email.yml` is in `.github/workflows/` in your repo. Create the folder path when uploading if needed.

**Step 6 — Test it**
Go to your repo → **Actions** → **Daily Task Email** → **Run workflow** → select `morning` or `evening` → run.

Check your inbox — you should receive the email within a minute.

### Email schedule
- **Morning (☀️):** 7:45am ET — work-weighted, focused on what needs doing today
- **Evening (🌙):** 5:00pm ET — personal and side projects only, more relaxed

To change the send times, edit the cron schedule in `daily_email.yml`. Times are in UTC.

---

## Sheet columns reference

The app manages these automatically, but useful if you edit the sheet directly:

**Tasks sheet**

| Column | Values | Notes |
|--------|--------|-------|
| category | text | Must match a category in the Categories sheet |
| group | text | Freeform grouping within a category |
| title | text | Required |
| priority | Critical / High / Med / Low | |
| due | YYYY-MM-DD | For one-off tasks with a deadline |
| notes | text | Optional context |
| frequency | Daily / Weekly / Monthly / etc. | For recurring tasks — leave due empty |
| last_completed | YYYY-MM-DD | Updated when you tap "Done Today" |
| completed | Y or blank | Updated when you tap "Done" |

**Categories sheet**

| Column | Values |
|--------|--------|
| name | text |
| color | hex color (e.g. #8b5cf6) |
| ignore_weekends | Y or blank |
| ignore_weekdays | Y or blank |
| no_daytime | Y or blank |
| no_nighttime | Y or blank |
| no_diversions | Y or blank |
| no_rotation | Y or blank |

---

## Keeping the app updated

When a new version of the app is released, replace `index.html` in your repo with the latest version. The app will detect the update and reload automatically on next open.

---

## Support

Made with ☕ by [Sheety.tools](https://sheety.tools). If this is useful to you, consider [buying a coffee](https://ko-fi.com/sheetytools).
