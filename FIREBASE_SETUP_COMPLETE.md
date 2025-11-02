# Firebase Deployment - Setup Complete ✅

## Selected Hosting Site

You are now deploying to: **dev-my-project**

- **Hosting URL**: https://dev-my-project.web.app
- **Firebase Project**: my-portfolio-7598c
- **Target**: dev

## What Was Configured

### 1. Firebase Configuration Files

**`.firebaserc`** - Project and target configuration
```json
{
  "projects": {
    "default": "my-portfolio-7598c"
  },
  "targets": {
    "my-portfolio-7598c": {
      "hosting": {
        "dev": [
          "dev-my-project"
        ]
      }
    }
  }
}
```

**`firebase.json`** - Hosting configuration
```json
{
  "hosting": {
    "target": "dev",
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

### 2. GitHub Actions Workflow

Updated `.github/workflows/frontend-ci-cd.yml` to deploy to **dev-my-project**:
- Project ID: `my-portfolio-7598c`
- Target: `dev`
- Hosting URL: https://dev-my-project.web.app

### 3. Initial Deployment

✅ Successfully deployed to: **https://dev-my-project.web.app**

## Available Hosting Sites

Your Firebase project has 2 hosting sites:

1. ✅ **dev-my-project** (Currently selected)
   - URL: https://dev-my-project.web.app
   - Purpose: Development/testing deployments

2. **my-portfolio-7598c** (Default site)
   - URL: https://my-portfolio-7598c.web.app
   - Purpose: Production deployments

## How to Switch Between Sites

If you want to switch to the other hosting site later:

### Option 1: Manual Deploy to Different Site

```bash
# Deploy to the default site
firebase deploy --only hosting:my-portfolio-7598c

# Deploy to dev site
firebase deploy --only hosting:dev
```

### Option 2: Update Configuration

Edit `firebase.json` and change the target:

```json
{
  "hosting": {
    "target": "my-portfolio-7598c",  // Change this
    "public": "frontend/dist",
    // ... rest of config
  }
}
```

Then update `.firebaserc` targets section accordingly.

## GitHub Secrets Required

For CI/CD to work, ensure these secrets are set in your GitHub repository:

1. **FIREBASE_SERVICE_ACCOUNT**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Copy entire JSON content

2. **VITE_API_URL** (Optional)
   - Your backend API URL if needed

Note: `FIREBASE_PROJECT_ID` is no longer needed as we hardcoded it in the workflow.

## Deployment Commands

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build
cd ..

# Deploy to dev site
firebase deploy --only hosting:dev
```

### Test Locally
```bash
# Build frontend
cd frontend && npm run build && cd ..

# Serve locally
firebase serve
```

Visit http://localhost:5000 to preview.

### Automatic CI/CD

Push to `main` branch:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will automatically:
1. Build the frontend
2. Deploy to https://dev-my-project.web.app

## Verify Deployment

Your app is now live at: **https://dev-my-project.web.app**

Check the Firebase Console:
https://console.firebase.google.com/project/my-portfolio-7598c/hosting

## Next Steps

1. ✅ Firebase configured for **dev-my-project** site
2. ✅ GitHub Actions workflow updated
3. ✅ Initial deployment successful
4. ⏳ Push to GitHub to test automatic CI/CD

## Troubleshooting

### If deployment fails in GitHub Actions:

1. **Check GitHub Secret**: Make sure `FIREBASE_SERVICE_ACCOUNT` is set correctly
2. **Verify permissions**: Service account needs "Firebase Hosting Admin" role
3. **Check build output**: Ensure `frontend/dist` directory exists after build

### Manual deployment works but CI/CD fails:

- Regenerate service account key
- Update GitHub secret with new JSON content
- Ensure secret has no extra spaces or formatting

## Summary

✅ Configured to deploy to: **dev-my-project**
✅ Live URL: https://dev-my-project.web.app
✅ CI/CD ready for automatic deployments
✅ `.gitignore` updated to exclude Firebase files

Your full-stack application is now deployed and ready! 🚀
