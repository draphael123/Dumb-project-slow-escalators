# Escaslow Daily 🐌

A daily photo gallery showcasing the world's slowest escalators. Built with Next.js and deployed on Vercel.

## Features

- 📸 Daily rotating Escaslow photos
- 🎨 Beautiful neon-themed UI
- ⚡ Fast and optimized with Next.js 14
- 📱 Fully responsive design
- 🌐 Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository or upload the project folder
4. Vercel will automatically configure and deploy

## Adding Daily Photos

To add new Escaslow photos, you can:

1. **Update the photos array** in `src/lib/escaslow.ts`
2. **Connect to a database** (e.g., Vercel Postgres, MongoDB)
3. **Use an API** to fetch photos dynamically
4. **Upload to a storage service** (e.g., Cloudinary, AWS S3)

## Customization

- Edit `src/app/page.tsx` to modify the main page
- Update `src/components/EscaslowDisplay.tsx` to change the photo display
- Modify `tailwind.config.ts` for theme customization
- Add photos to `src/lib/escaslow.ts`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## License

MIT

---

*Because sometimes, you just need to slow down.* 🐌


