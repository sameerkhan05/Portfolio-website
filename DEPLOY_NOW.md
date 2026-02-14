# 🚀 Deploy to Netlify - Quick Guide

Your production build is ready in the `dist` folder!

## Method 1: Drag & Drop (Easiest) ⭐

1. **Open Netlify Dashboard**
   - Go to: https://app.netlify.com/
   - Login with your account

2. **Find Your Existing Site**
   - Click on your existing portfolio site

3. **Deploy**
   - Click on **"Deploys"** tab at the top
   - Scroll down to find the **"Drag and drop"** area
   - Drag the entire `dist` folder from Explorer and drop it there

4. **Wait & Done!**
   - Wait 30-60 seconds for processing
   - Your site will be live at your existing domain! ✅

---

## Method 2: CLI Deployment

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to your existing site
netlify deploy --prod --dir=dist
```

When prompted, select your existing site.

---

## After Deployment

### ✅ Add Netlify Domain to Firebase

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: `portfolio-visitor-counte-44295`
3. Click **Authentication** → **Settings** → **Authorized domains**
4. Add your Netlify domain (e.g., `yoursite.netlify.app` or custom domain)
5. Click **Add domain**

**This is critical for the visitor counter to work!**

---

## Test Your Deployed Site

- ✅ Check if visitor badge shows and increments
- ✅ Verify custom favicon appears
- ✅ Test contact form profanity filter
- ✅ Check mobile view (visitor badge outside terminal)

---

**Ready?** Drag the `dist` folder to Netlify now! 🚀
