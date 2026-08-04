# SHINE Setup Guide

This guide covers the main steps required to fork the repository, clone it, connect it to Google Apps Script, pull updates, and deploy changes.

---

## 1. Fork the Repository

Open the main SHINE repository:

```text
https://github.com/SchoolFuel/Shine
```

Click **Fork** and create a copy under your own GitHub account.

---

## 2. Clone Your Fork

Clone your forked repository:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/Shine.git
```

Move into the project folder:

```bash
cd Shine
```

---

## 3. Add the Main Repository as Upstream

Add the original SHINE repository:

```bash
git remote add upstream https://github.com/SchoolFuel/Shine.git
```

Verify the remotes:

```bash
git remote -v
```

You should see:

```text
origin    https://github.com/<YOUR_GITHUB_USERNAME>/Shine.git
upstream  https://github.com/SchoolFuel/Shine.git
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

In the local SHINE project, open:

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
