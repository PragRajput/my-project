# Complete Firebase Deployment Setup Guide

## 🚀 Quick Start - Firebase Hosting with CI/CD

Follow these steps to deploy your frontend to Firebase with automated CI/CD:

---

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

This opens your browser for Google authentication.

## Step 3: Create Firebase Project

Option A: **Create via Firebase Console**
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name (e.g., `my-fullstack-app`)
4. Disable Google Analytics (optional)
5. Click "Create project"

Option B: **Create via CLI** (after logging in)
```bash
firebase projects:create my-fullstack-app
```

## Step 4: Initialize Firebase in Your Project

```bash
cd C:\Users\a\OneDrive\Desktop\CI_CD
firebase init hosting
```

**Select the following options:**

1. **Which Firebase features?** → Select `Hosting`
2. **Select a project** → Choose your project from Step 3
3. **What do you want to use as public directory?** → Enter: `frontend/dist`
4. **Configure as single-page app?** → `Yes`
5. **Set up automatic builds with GitHub?** → `No` (we'll use GitHub Actions)
6. **Overwrite index.html?** → `No`

This creates:
- `firebase.json` - Firebase configuration
- `.firebaserc` - Project settings

## Step 5: Verify Firebase Configuration

Check that `firebase.json` looks like this:

```json
{
  "hosting": {
    "public": "frontend/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Step 6: Test Local Build

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Test Firebase hosting locally
firebase serve
```

Visit `http://localhost:5000` to preview.

## Step 7: Manual Deployment (Test)

Deploy manually first to ensure everything works:

```bash
firebase deploy --only hosting
```

You'll get a URL like: `https://my-fullstack-app.web.app`

## Step 8: Set Up GitHub Repository

If not already done:

```bash
git init
git add .
git commit -m "Add Firebase configuration"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 9: Generate Firebase Service Account

For CI/CD, you need a service account:

1. Go to https://console.firebase.google.com/
2. Select your project
3. Click the gear icon ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Click **Generate key** (downloads a JSON file)
7. **IMPORTANT**: Keep this file secure! Don't commit it to Git.

## Step 10: Add GitHub Secrets

Go to your GitHub repository:

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**

Add these THREE secrets:

### Secret 1: FIREBASE_PROJECT_ID
- **Name**: `FIREBASE_PROJECT_ID`
- **Value**: Your project ID (e.g., `my-fullstack-app`)

### Secret 2: FIREBASE_SERVICE_ACCOUNT
- **Name**: `FIREBASE_SERVICE_ACCOUNT`
- **Value**: Contents of the JSON file from Step 9 (entire file content)

### Secret 3: VITE_API_URL (Optional)
- **Name**: `VITE_API_URL`
- **Value**: Your backend API URL (e.g., `https://your-backend.com`)

## Step 11: Update .gitignore

Make sure these are in your `.gitignore`:

```
# Firebase
.firebase/
*-service-account.json
firebase-debug.log

# Build outputs
frontend/dist/
backend/dist/
```

## Step 12: Push to GitHub

```bash
git add .
git commit -m "Add Firebase CI/CD configuration"
git push origin main
```

## Step 13: Monitor Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see the workflow running
4. Click on the workflow to see progress

If successful, you'll see:
```
✅ Frontend deployed successfully!
🌐 Your app is live at: https://your-project.web.app
```

---

## 🎯 How CI/CD Works

### Automatic Triggers

The CI/CD pipeline automatically runs when:
- You push to `main` branch
- You create a PR to `main` branch
- Changes are made in `frontend/` directory

### Build Process

1. **Linting**: Checks code quality
2. **Type Check**: Validates TypeScript
3. **Build**: Creates production bundle
4. **Test**: Runs on Node.js 18.x and 20.x
5. **Deploy**: Deploys to Firebase (only on main push)

### Deployment Flow

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Install dependencies
    ↓
Build frontend (frontend/dist)
    ↓
Deploy to Firebase Hosting
    ↓
Live at https://your-project.web.app
```

---

## 🔧 Advanced Configuration

### Custom Domain

1. Go to Firebase Console → Hosting
2. Click **Add custom domain**
3. Follow DNS setup instructions

### Environment Variables

Add more secrets in GitHub:

```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_OTHER_VAR: ${{ secrets.VITE_OTHER_VAR }}
```

### Preview Channels (PR Previews)

To enable preview deployments for PRs, update workflow:

```yaml
- name: Deploy to Preview Channel
  if: github.event_name == 'pull_request'
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
    projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
    expires: 7d
```

---

## 🐛 Troubleshooting

### Issue: Build fails with "Firebase token invalid"

**Solution**: Regenerate service account and update GitHub secret.

### Issue: "Public directory not found"

**Solution**: Ensure `frontend/dist` exists after build:
```bash
cd frontend && npm run build
ls dist  # Should show index.html and assets
```

### Issue: Environment variables not working

**Solution**:
1. Check GitHub secrets are named correctly (must start with `VITE_`)
2. Ensure they're passed in the build step:
```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

### Issue: Deployment succeeds but site shows old version

**Solution**: Clear Firebase cache:
```bash
firebase hosting:channel:delete live
firebase deploy --only hosting
```

Or clear browser cache (Ctrl+Shift+R)

---

## 📊 Monitoring & Analytics

### View Deployment History

```bash
firebase hosting:sites:list
```

### View Logs

Go to Firebase Console → Hosting → View usage

### Check Deployment Status

```bash
firebase hosting:channel:list
```

---

## 💡 Best Practices

1. **Always test locally first**
   ```bash
   npm run build && firebase serve
   ```

2. **Use environment-specific configs**
   - Development: `.env.development`
   - Production: GitHub Secrets

3. **Enable caching** (already configured in `firebase.json`)

4. **Monitor build times** in GitHub Actions

5. **Use preview channels** for testing before production

6. **Set up custom domain** for professional look

7. **Enable Firebase Analytics** for traffic insights

---

## 🚀 Quick Commands Reference

```bash
# Login
firebase login

# List projects
firebase projects:list

# Switch project
firebase use your-project-id

# Build and deploy manually
cd frontend && npm run build && cd .. && firebase deploy

# Serve locally
firebase serve

# View deployment history
firebase hosting:releases:list

# Rollback to previous deployment
firebase hosting:rollback

# Check Firebase CLI version
firebase --version
```

---

## 📝 Summary

**What you've set up:**
- ✅ Firebase Hosting for frontend
- ✅ Automated CI/CD with GitHub Actions
- ✅ Build, test, and deploy on every push to main
- ✅ Environment variables via GitHub Secrets
- ✅ Production-ready configuration

**Your frontend is now:**
- 🌐 Deployed at: `https://your-project.web.app`
- 🔄 Auto-deployed on every push to main
- ⚡ Served via Firebase CDN (fast globally)
- 🔒 HTTPS enabled by default
- 📱 Mobile-optimized and responsive

---

## 🎉 Next Steps

1. **Deploy Backend**: Use Heroku, Railway, or Google Cloud Run
2. **Set up Database**: Firebase Firestore or external database
3. **Add Authentication**: Firebase Auth integration
4. **Set up Monitoring**: Firebase Performance Monitoring
5. **Configure Analytics**: Google Analytics 4

**Your app is live and ready! 🚀**
