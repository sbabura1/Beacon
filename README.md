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

Use the Google account that has access to the required Google Sheets, Docs, or Slides file and Apps Script project.

---

## 5. Change the Apps Script ID

Open the Google Sheets, Docs, or Slides file that you want to use.

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
4. Return to the Google file.
5. Refresh the page.

The SHINE menu should appear in Google Sheets, Docs, or Slides.

---
