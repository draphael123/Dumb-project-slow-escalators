# Deploying Escaslow Daily to Vercel

## Quick Deploy Options

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Escaslow Daily"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live in seconds.

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 3: Deploy via GitHub Integration

1. Connect your GitHub account to Vercel
2. Select the repository
3. Vercel will automatically deploy on every push to main

## Environment Variables

Currently, no environment variables are required. If you add a database or external API later, add them in:
- Vercel Dashboard → Project → Settings → Environment Variables

## Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Monitoring

- View deployments in the Vercel Dashboard
- Check logs in the "Deployments" tab
- Set up notifications for failed deployments

---

**Note:** The site uses Unsplash images by default. For production, you may want to:
- Upload your own Escaslow photos to a CDN
- Set up a database to store photo metadata
- Use Vercel Blob Storage or similar for image hosting


