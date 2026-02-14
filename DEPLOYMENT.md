# 🚀 Netlify Deployment Guide

## Step 1: Build Your Project

First, let's build the production version:

```bash
npm run build
```

This creates a `dist` folder with your optimized portfolio.

---

## Step 2: Deploy to Netlify

### Method A: Drag & Drop (Easiest)

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Find your existing portfolio site
3. Click on **"Deploys"** tab
4. Drag and drop the `dist` folder into the deploy zone
5. Wait 30-60 seconds for deployment
6. Done! Your site is live ✅

### Method B: CLI Deployment

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod --dir=dist
```

---

## Step 3: Environment Variables (Firebase)

Your Firebase config is hardcoded in `src/config/firebase.js`, so **no environment variables needed** for this deployment.

> **Security Note**: For production, you should move Firebase credentials to environment variables. Let me know if you want to set this up!

---

## Step 4: Update Firebase Authorized Domains

After deployment, add your Netlify domain to Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `portfolio-visitor-counte-44295`
3. Click **"Authentication"** → **"Settings"** → **"Authorized domains"**
4. Add your Netlify domain (e.g., `yoursite.netlify.app` or your custom domain)
5. Click **"Add domain"**

---

## Step 5: Test Your Deployed Site

1. Visit your Netlify URL
2. Check if the visitor counter works
3. Try submitting the contact form
4. Verify profanity filter works
5. Check mobile view (visitor badge outside terminal)

---

## 🔧 Troubleshooting

**Visitor counter not incrementing?**
- Check Firebase Console → Authorized domains
- Check browser console for CORS errors

**Contact form not working?**
- Your backend server (`server.js`) needs to be deployed separately
- Consider using serverless functions or keep backend on a separate service

---

## Ready to Deploy?

Run `npm run build` and let me know when it's done!
