# Beacon Setup Guide

## Frontend workflow

This repository now uses a Vite React frontend. The editable source lives in:

```text
src/
```

Important files:

```text
src/App.jsx                    Frontend routes and shared simulation state
src/data/simulationData.js     Mock simulation data
src/data/navigatorData.js      Mock navigator data
src/pages/                     Simulation and navigator screens
src/components/                Reusable UI components
src/styles/                    SHINE theme, layout, animation, and view styling
```

Install dependencies once:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

Useful local routes:

```text
http://127.0.0.1:5173/#/navigator
http://127.0.0.1:5173/#/start
http://127.0.0.1:5173/#/sprint
http://127.0.0.1:5173/#/ido
http://127.0.0.1:5173/#/wedo
http://127.0.0.1:5173/#/youdo
http://127.0.0.1:5173/#/brief
```

Build and validate:

```bash
npm run lint
npm run build
```

## Google Apps Script deploy workflow

Do not edit the generated Apps Script HTML directly unless you are fixing a deploy-only issue.
Edit the React source in `src/`, then generate the Apps Script bundles:

```bash
npm run build:gas
```

This creates deploy-ready `Dialog.html` and `Sidebar.html` from the Vite build.

Push to Apps Script:

```bash
clasp push
```

Or run both steps:

```bash
npm run push:gas
```

The `.claspignore` file intentionally pushes only:

```text
appsscript.json
Code.js
Dialog.html
Sidebar.html
```

Do not commit `.clasp.json`; it contains the local Apps Script project binding. Use `.clasp.example.json` as the template for new developers.

For a new developer:

```bash
cp .clasp.example.json .clasp.json
```

Then paste their Apps Script ID into `.clasp.json`.

This guide covers the main steps required to fork this repository, clone your fork, connect it to Google Apps Script, and deploy changes.

---

## 1. Fork the Repository

Open the Beacon repository:

```text
https://github.com/sbabura1/Beacon
```

Click **Fork** and create a copy under your own GitHub account.

---

## 2. Clone Your Fork

Clone your forked Beacon repository:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/Beacon.git
```

Move into the project folder:

```bash
cd Beacon
```

---

## 3. Verify the Remote

This project is intended to be a standalone repository. Your fork should only need your `origin` remote:

```bash
git remote -v
```

Expected shape:

```text
origin    https://github.com/<YOUR_GITHUB_USERNAME>/Beacon.git
```

---

## 4. Install clasp

Install Google Apps Script CLI:

```bash
npm install -g @google/clasp
```

Verify the installation:

```bash
clasp --version
```

Login to Google:

```bash
clasp login
```

Use the Google account that has access to the required Google Sheet or Apps Script project.

---

## 5. Change the Apps Script ID

Open the Google Sheet that you want to use.

Go to:

```text
Extensions → Apps Script
```

In the Apps Script editor:

```text
Project Settings → Script ID
```

Copy the Script ID.

In the local Beacon project, open:

```text
.clasp.json
```

Update it with your Script ID:

```json
{
  "scriptId": "PASTE_YOUR_SCRIPT_ID_HERE",
  "rootDir": "."
}
```
---

## 6. Push the Code to Apps Script

Upload the local project files:

```bash
clasp push
```

After pushing:

1. Open the Apps Script editor.
2. Run the `onOpen` function.
3. Approve the requested permissions.
4. Return to the Google Sheet.
5. Refresh the page.

The SHINE menu should appear in Google Sheets.

---
