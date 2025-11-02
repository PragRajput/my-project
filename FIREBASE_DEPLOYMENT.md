# Firebase Hosting Deployment Guide

## Step 1: Install Firebase CLI

Open your terminal and install Firebase CLI globally:

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

This will open your browser to authenticate with your Google account.

## Step 3: Initialize Firebase in Your Project

Navigate to your project root and initialize Firebase:

```bash
cd C:\Users\a\OneDrive\Desktop\CI_CD
firebase init hosting
```

When prompted, choose:
- **"Use an existing project"** or **"Create a new project"**
- **Public directory**: Enter `frontend/dist` (this is where Vite builds your app)
- **Configure as single-page app**: Yes
- **Set up automatic builds with GitHub**: No (we'll do this manually with GitHub Actions)
- **Overwrite index.html**: No

## Step 4: Update Firebase Configuration

The `firebase init` command creates `firebase.json`. Make sure it looks like this:

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

## Step 5: Test Local Deployment

Build your frontend and test Firebase hosting locally:

```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Test Firebase hosting locally
firebase serve
```

Visit `http://localhost:5000` to see your app.

## Step 6: Manual Deployment (First Time)

Deploy manually to ensure everything works:

```bash
firebase deploy
```

You'll get a hosting URL like: `https://your-project.web.app`

## Step 7: Set Up GitHub Repository

If you haven't already, initialize a git repository:

```bash
git init
git add .
git commit -m "Initial commit with Firebase setup"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 8: Generate Firebase Token for CI/CD

Generate a CI token for GitHub Actions:

```bash
firebase login:ci
```

This will generate a token like: `1//abcdefghijklmnop...`

**IMPORTANT**: Copy this token! You'll need it in the next step.

## Step 9: Add Firebase Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:
   - Name: `FIREBASE_TOKEN`
   - Value: Paste the token from Step 8

## Step 10: Update GitHub Actions Workflow

I'll now update your CI/CD pipeline to deploy to Firebase automatically.
