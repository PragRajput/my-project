# How to Add Firebase Token to GitHub Secrets

## Step-by-Step Visual Guide

### Step 1: Go to Your GitHub Repository

1. Open your browser
2. Go to: **https://github.com/PragRajput/my-project**

### Step 2: Click on "Settings" Tab

Look at the top of the repository page, you'll see tabs:
```
Code    Issues    Pull requests    Actions    Projects    Wiki    Settings
                                                                    ↑
                                                              Click here
```

**⚠️ IMPORTANT:** If you don't see the "Settings" tab, it means:
- You're not logged in to GitHub, OR
- You don't have admin access to the repository

Make sure you're logged in as **PragRajput** (the repository owner).

### Step 3: Navigate to Secrets

On the left sidebar of the Settings page, look for:

```
Settings
├── General
├── Collaborators
├── Code and automation
│   └── Actions
├── Secrets and variables ← Click this
│   ├── Actions ← Then click this
│   ├── Codespaces
│   └── Dependabot
├── Security
└── ...
```

### Step 4: Add New Secret

You should now see a page that says "Actions secrets and variables"

Click the green button: **"New repository secret"**

### Step 5: Fill in the Secret Details

You'll see a form:

```
┌────────────────────────────────────────────────────────┐
│  New secret                                            │
│                                                         │
│  Name *                                                │
│  ┌──────────────────────────────────────────────────┐ │
│  │ FIREBASE_SERVICE_ACCOUNT                         │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Secret *                                              │
│  ┌──────────────────────────────────────────────────┐ │
│  │ (Paste your Firebase token here)                 │ │
│  │                                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│             [Add secret]                               │
└────────────────────────────────────────────────────────┘
```

### Step 6: Save the Secret

Click the **"Add secret"** button

---

## Alternative: Direct URL Method

Simply open this URL in your browser:

```
https://github.com/PragRajput/my-project/settings/secrets/actions/new
```

This should take you directly to the "New secret" page.

---

## Troubleshooting

### Issue: "404 Page Not Found"

**Cause:** You're not logged in or don't have access

**Fix:**
1. Make sure you're logged in to GitHub
2. Make sure you're logged in as **PragRajput** (repository owner)
3. Try the step-by-step method instead of direct URL

### Issue: "Settings tab is missing"

**Cause:** You don't have admin permissions

**Fix:**
1. Log in as the repository owner (PragRajput)
2. Or ask the repository owner to add the secret for you

### Issue: "I see Settings but no 'Secrets and variables'"

**Cause:** Looking in the wrong place

**Fix:**
1. Make sure you're in the **repository** settings (not account settings)
2. URL should be: `https://github.com/PragRajput/my-project/settings`
3. Look on the LEFT sidebar for "Secrets and variables"

---

## Verification

After adding the secret, you should see it listed:

```
Repository secrets

┌────────────────────────────────────────────────────┐
│ FIREBASE_SERVICE_ACCOUNT                           │
│ Updated 1 minute ago                               │
│                                           [Update] │
└────────────────────────────────────────────────────┘
```

**Note:** You won't be able to see the secret value after saving (for security reasons).

---

## What's Your Firebase Token?

The token you got from `firebase login:ci` should look like this:

```
1//0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
```

Copy the ENTIRE string (including `1//` at the beginning).

---

## Next Steps

Once the secret is added:

1. **Test the setup:**
   ```bash
   git add .
   git commit -m "Add Firebase CI/CD configuration"
   git push origin main
   ```

2. **Watch the workflow:**
   - Go to: https://github.com/PragRajput/my-project/actions
   - You'll see the workflow start automatically

3. **Verify deployment:**
   - Wait 3-5 minutes
   - Visit: https://dev-my-project.web.app
   - Your app should be deployed!

---

## Quick Links

| What | URL |
|------|-----|
| **Your Repository** | https://github.com/PragRajput/my-project |
| **Repository Settings** | https://github.com/PragRajput/my-project/settings |
| **Secrets Page** | https://github.com/PragRajput/my-project/settings/secrets/actions |
| **New Secret (Direct)** | https://github.com/PragRajput/my-project/settings/secrets/actions/new |
| **Actions Tab** | https://github.com/PragRajput/my-project/actions |

---

## Still Having Issues?

Try these alternative methods:

### Method 1: Use GitHub CLI (if installed)
```bash
gh secret set FIREBASE_SERVICE_ACCOUNT --body "YOUR_TOKEN_HERE"
```

### Method 2: Manual Navigation
1. Go to: https://github.com/PragRajput
2. Click on "my-project" repository
3. Click "Settings" (top right, next to "Insights")
4. Scroll down left sidebar
5. Find "Secrets and variables"
6. Click "Actions"
7. Click "New repository secret"

---

## Screenshot Descriptions

### What You Should See:

**On Secrets Page:**
- Title: "Actions secrets and variables"
- Green button: "New repository secret"
- Tabs: "Secrets" and "Variables"
- List of existing secrets (if any)

**On New Secret Page:**
- Title: "Actions secrets / New secret"
- Two input fields: "Name" and "Secret"
- Green button: "Add secret"
- Gray button: "Cancel"

---

If you're still having trouble, please let me know:
1. What page are you on? (Share the URL)
2. What do you see on the screen?
3. Are you logged in to GitHub as PragRajput?
