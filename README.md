# DevKits.in - Essential Online Development Tools

A comprehensive collection of online development utilities for developers, designers, and technical professionals.

## 🌐 Live Website
Visit: [https://devkits.in](https://devkits.in)

## 🚀 Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/devkits)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devkits)

### Quick Vercel Deployment Steps:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy" - your site will be live in ~2 minutes
6. Add custom domain `devkits.in` in project settings

### Quick Netlify Deployment Steps:
1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Choose repository name (e.g., `devkits-tools`)
4. Click "Save & Deploy"
5. Wait for build to complete (~2-3 minutes)
6. Your site will be live at `https://[random-name].netlify.app`

## 🛠️ Tools Available

### Core Utilities
- Screen Resolution Detector
- IP Address Information
- User Agent Analyzer
- Color Tools (Picker, Converter, Palette)

### Text & Data Processing
- JSON Formatter & Validator
- JWT Token Decoder
- URL Encoder/Decoder
- Text Case Converter
- Hash Generator (MD5, SHA1, SHA256, SHA512)
- Base64 Encoder/Decoder

### Developer Utilities
- UUID/GUID Generator
- Regex Pattern Tester
- Password Generator
- Lorem Ipsum Generator

### Code & Design Tools
- CSS Generator (Gradients, Shadows, Borders)
- Image Optimizer
- Markdown Live Preview
- Code Beautifier (HTML, CSS, JS, JSON)
- Diff Checker

### Converters & Generators
- QR Code Generator
- Time & Timezone Tools
- Unit Converter

### 🎮 Developer Games
- Snake Game
- Tetris
- Memory Card Game
- Typing Speed Test
- Reaction Time Test
- Color Guessing Game

## 🚀 Domain Setup Instructions

### Connecting devkits.in to Netlify:

#### Step 1: Add Custom Domain in Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings → Domain management
4. Click "Add custom domain"
5. Enter `devkits.in`
6. Click "Verify" and then "Yes, add domain"
7. Netlify will show you the required DNS records

#### Step 2: Configure GoDaddy DNS
1. Login to your GoDaddy account
2. Go to "My Products" → "All Products and Services"
3. Find your domain `devkits.in` and click "DNS"
4. Click "Manage DNS"
5. Add these DNS records:

**Required DNS Records for Netlify:**
- **Type**: A, **Name**: @, **Value**: `75.2.60.5`
- **Type**: CNAME, **Name**: www, **Value**: `[your-site-name].netlify.app`

#### Step 3: Enable HTTPS (Automatic)
1. Back in Netlify, go to Site settings → Domain management
2. Scroll to "HTTPS" section
3. Netlify will automatically provision SSL certificate
4. Wait 24-48 hours for DNS propagation

#### Step 4: Set up Redirects (Optional)
Create a `_redirects` file in your `public` folder:
```
# Redirect www to non-www
https://www.devkits.in/* https://devkits.in/:splat 301!

# SPA fallback
/*    /index.html   200
```

## 🎨 Features
- ⚡ Fast loading with Vite
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design
- 🎯 GSAP animations
- 📋 Copy-to-clipboard functionality
- 🎮 Interactive games section
- 🔧 25+ developer tools

## 🛠️ Tech Stack
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- GSAP for animations
- React Router for navigation
- Lucide React for icons
- Deployed on Netlify

## 📦 Installation
```bash
npm install
npm run dev
```

## 🚀 Build for Production
```bash
npm run build
```

The `dist` folder will contain your production build ready for deployment.

## 🔧 Netlify Configuration

## 🔧 Vercel Configuration

### Build Settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables (if needed):
Go to Project Settings → Environment Variables to add any required env vars.

### Custom Domain Setup:
1. Go to Project Settings → Domains
2. Add `devkits.in` and `www.devkits.in`
3. Configure DNS records in GoDaddy:
   - **A Record**: `@` → `76.76.19.61`
   - **CNAME**: `www` → `cname.vercel-dns.com`

### Build Settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18.x

### Environment Variables (if needed):
Go to Site settings → Environment variables to add any required env vars.

## 📄 License
© 2025 DevKits.in. All rights reserved.