# CI/CD Setup & Testing Guide

## Your Current Status

✅ **Completed:**
- Firebase configured for `dev-my-project` hosting site
- GitHub repository connected: `PragRajput/my-project`
- CI/CD workflow file created: `.github/workflows/frontend-ci-cd.yml`
- Manual deployment successful: https://dev-my-project.web.app

⏳ **Remaining:**
- Add GitHub secrets
- Push code to trigger CI/CD
- Verify automated deployment

---

## Step 1: Add GitHub Secret (REQUIRED)

### Option A: Using Firebase Service Account (Recommended)

1. **Generate Service Account Key**
   - Go to: https://console.firebase.google.com/project/my-portfolio-7598c/settings/serviceaccounts/adminsdk
   - Click **"Generate new private key"**
   - Click **"Generate key"** button
   - A JSON file will download (e.g., `my-portfolio-7598c-firebase-adminsdk-xxxxx.json`)
   - **IMPORTANT:** Keep this file secure! Never commit it to Git.

2. **Add Secret to GitHub**
   - Go to: https://github.com/PragRajput/my-project/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Copy and paste the **ENTIRE contents** of the JSON file
   - Click **"Add secret"**

### Option B: Using Firebase Token (Alternative)

```bash
firebase login:ci
```

This generates a token. Add it as:
- Name: `FIREBASE_TOKEN`
- Value: The token generated

Then update `.github/workflows/frontend-ci-cd.yml` to use token instead of service account.

---

## Step 2: Push Code to GitHub

Once the secret is added, push your code:

```bash
# Make sure you're in the root directory (CI_CD folder)
cd C:\Users\a\OneDrive\Desktop\CI_CD

# Add all changes
git add .

# Commit with a message
git commit -m "Configure Firebase for dev-my-project hosting with CI/CD"

# Push to main branch (triggers CI/CD)
git push origin main
```

**This will automatically trigger the CI/CD pipeline!**

---

## Step 3: Monitor CI/CD Workflow

### Where to Check:

1. **GitHub Actions Tab**
   - Go to: https://github.com/PragRajput/my-project/actions
   - You'll see the workflow running in real-time

2. **What You'll See:**

```
Workflow: Frontend CI/CD

Jobs:
├── build-and-test
│   ├── ✓ Checkout code
│   ├── ✓ Setup Node.js
│   ├── ✓ Install dependencies
│   ├── ✓ Lint code
│   ├── ✓ Type check
│   └── ✓ Build for production
│
└── deploy
    ├── ✓ Checkout code
    ├── ✓ Setup Node.js
    ├── ✓ Install dependencies
    ├── ✓ Build for production
    └── ✓ Deploy to Firebase Hosting
        └── 🌐 Live at: https://dev-my-project.web.app
```

### Timeline:

- **Build & Test Job:** ~2-3 minutes
- **Deploy Job:** ~1-2 minutes
- **Total Time:** ~3-5 minutes

---

## Step 4: Verify It's Working

### ✅ Success Indicators:

1. **GitHub Actions Tab:**
   - Green checkmark ✓ next to workflow run
   - "Deploy to Firebase Hosting" step shows success
   - Deployment URL displayed in logs

2. **Firebase Console:**
   - Go to: https://console.firebase.google.com/project/my-portfolio-7598c/hosting
   - You'll see a new deployment entry
   - Check the timestamp matches your push

3. **Live Website:**
   - Visit: https://dev-my-project.web.app
   - Your latest changes should be visible
   - Check browser console for no errors

### ❌ Failure Indicators:

1. **Red X in GitHub Actions**
   - Click on the failed workflow
   - Check which step failed
   - Read error logs

2. **Common Errors:**

   **Error:** "Resource not accessible by integration"
   - **Fix:** Check GitHub secret name is exactly `FIREBASE_SERVICE_ACCOUNT`

   **Error:** "Permission denied"
   - **Fix:** Regenerate service account key with correct permissions

   **Error:** "Public directory not found"
   - **Fix:** Ensure `frontend/dist` exists after build

---

## How CI/CD Works (Automated Flow)

```
┌─────────────────────────────────────────────────────────────┐
│  YOU PUSH CODE TO GITHUB (main branch)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions Detects Push to Main                       │
│  Triggers: .github/workflows/frontend-ci-cd.yml             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  JOB 1: build-and-test (Runs on Node 18.x & 20.x)         │
│  ✓ Checks out code                                          │
│  ✓ Installs dependencies (npm ci)                           │
│  ✓ Runs linter (npm run lint)                               │
│  ✓ Runs type check (npm run type-check)                     │
│  ✓ Builds frontend (npm run build)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  JOB 2: deploy (Only if build-and-test succeeds)           │
│  ✓ Checks out code                                          │
│  ✓ Installs dependencies                                    │
│  ✓ Builds frontend with env vars                            │
│  ✓ Deploys to Firebase (dev-my-project site)                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  YOUR APP IS LIVE! 🚀                                       │
│  https://dev-my-project.web.app                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Testing the CI/CD Pipeline

### Test 1: Make a Simple Change

1. **Edit a file:**
   ```bash
   # Example: Change the title in App.tsx
   # frontend/src/App.tsx - line 194
   ```

2. **Push the change:**
   ```bash
   git add .
   git commit -m "Test CI/CD: Update app title"
   git push origin main
   ```

3. **Watch GitHub Actions:**
   - Go to: https://github.com/PragRajput/my-project/actions
   - See the workflow start automatically
   - Wait for green checkmark

4. **Verify deployment:**
   - Visit: https://dev-my-project.web.app
   - See your changes live (may take 1-2 minutes to propagate)

### Test 2: Create a Pull Request (Optional)

Pull requests also trigger the workflow (but won't deploy):

1. **Create a new branch:**
   ```bash
   git checkout -b feature/test-pr
   ```

2. **Make changes and push:**
   ```bash
   git add .
   git commit -m "Test PR workflow"
   git push origin feature/test-pr
   ```

3. **Create PR on GitHub:**
   - GitHub will run build-and-test
   - Won't deploy (only main branch deploys)

---

## Workflow Triggers

Your CI/CD runs automatically when:

### ✅ Triggers Deployment:
- Push to `main` branch
- Changes in `frontend/**` directory
- Changes in workflow file itself

### ✅ Triggers Build Only (No Deploy):
- Pull request to `main` branch
- Changes in `frontend/**` directory

### ❌ Does NOT Trigger:
- Changes only in `backend/**` (frontend workflow ignores)
- Changes only in `.md` files
- Pushes to other branches (except PRs to main)

---

## Viewing Deployment Logs

### In GitHub Actions:

1. Go to: https://github.com/PragRajput/my-project/actions
2. Click on a workflow run
3. Click on "deploy" job
4. Expand "Deploy to Firebase Hosting" step
5. You'll see:
   ```
   ✔ Deploy complete!

   Project Console: https://console.firebase.google.com/project/my-portfolio-7598c/overview
   Hosting URL: https://dev-my-project.web.app
   ```

### In Firebase Console:

1. Go to: https://console.firebase.google.com/project/my-portfolio-7598c/hosting
2. Click on "dev-my-project" site
3. See deployment history with timestamps
4. View release details and rollback if needed

---

## Troubleshooting

### Issue 1: Workflow Not Triggering

**Check:**
- Push is to `main` branch (not other branches)
- Changes are in `frontend/**` directory
- Workflow file exists: `.github/workflows/frontend-ci-cd.yml`

**Fix:**
```bash
# Check current branch
git branch

# Switch to main if needed
git checkout main

# Push again
git push origin main
```

### Issue 2: Build Fails

**Common Causes:**
- TypeScript errors
- Linting errors
- Missing dependencies

**Fix:**
```bash
# Test locally first
cd frontend
npm run lint
npm run type-check
npm run build

# Fix errors, then push
```

### Issue 3: Deploy Fails

**Common Causes:**
- Missing `FIREBASE_SERVICE_ACCOUNT` secret
- Incorrect project ID or target
- Permissions issue

**Fix:**
1. Verify secret exists: https://github.com/PragRajput/my-project/settings/secrets/actions
2. Regenerate service account key if needed
3. Check Firebase permissions

### Issue 4: Deployment Success but Changes Not Visible

**Causes:**
- Browser cache
- Firebase CDN propagation delay

**Fix:**
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# Or clear browser cache
# Or try incognito/private window

# Check Firebase deployment time in console
```

---

## Quick Reference Commands

### Local Development:
```bash
# Frontend dev server
cd frontend && npm run dev

# Build locally
cd frontend && npm run build

# Test Firebase hosting locally
firebase serve
```

### Firebase Commands:
```bash
# Deploy manually (if CI/CD fails)
firebase deploy --only hosting:dev

# View deployment history
firebase hosting:releases:list

# Rollback deployment
firebase hosting:rollback
```

### Git Commands:
```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push (triggers CI/CD)
git push origin main

# View commit history
git log --oneline
```

---

## Next Steps

1. **Add GitHub Secret** (FIREBASE_SERVICE_ACCOUNT)
2. **Push code to GitHub** (triggers first CI/CD run)
3. **Monitor GitHub Actions** (watch it work!)
4. **Verify deployment** (check live site)
5. **Make a test change** (confirm automated deployments)

---

## URLs for Quick Access

| Resource | URL |
|----------|-----|
| **GitHub Repo** | https://github.com/PragRajput/my-project |
| **GitHub Actions** | https://github.com/PragRajput/my-project/actions |
| **GitHub Secrets** | https://github.com/PragRajput/my-project/settings/secrets/actions |
| **Live Site** | https://dev-my-project.web.app |
| **Firebase Console** | https://console.firebase.google.com/project/my-portfolio-7598c |
| **Firebase Hosting** | https://console.firebase.google.com/project/my-portfolio-7598c/hosting |
| **Service Accounts** | https://console.firebase.google.com/project/my-portfolio-7598c/settings/serviceaccounts/adminsdk |

---

## Summary

**Your CI/CD is ready!** Just:

1. Add `FIREBASE_SERVICE_ACCOUNT` secret to GitHub
2. Push code with `git push origin main`
3. Watch magic happen at GitHub Actions tab
4. See changes live at https://dev-my-project.web.app

Every push to `main` = Automatic deployment! 🚀
