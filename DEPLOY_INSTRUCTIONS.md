# Deploy to Vercel - Step by Step

## Method 1: Via GitHub (Recommended - Takes 5 minutes)

### Step 1: Create a GitHub Repository
1. Go to https://github.com/new
2. Repository name: `escaslow-daily` (or any name you like)
3. Make it **Public** or **Private** (your choice)
4. **DON'T** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Push Your Code
After you create the repo, GitHub will show you commands. Replace `YOUR_USERNAME` and `escaslow-daily` with your actual values, then run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/escaslow-daily.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find and select `escaslow-daily` repository
5. Click "Import"
6. Vercel will auto-detect Next.js settings
7. Click "Deploy"

**Done!** Your site will be live in ~2 minutes at a URL like `escaslow-daily.vercel.app`

---

## Method 2: Direct Upload (Alternative)

Vercel doesn't support direct file uploads, but you can:

1. **Extract the ZIP** to a folder
2. **Push to GitHub** using Method 1 above
3. **Import to Vercel** as described

---

## Quick Command Reference

If you have your GitHub repo URL, just run these (replace with your URL):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main  
git push -u origin main
```

Then import to Vercel via the web interface.

