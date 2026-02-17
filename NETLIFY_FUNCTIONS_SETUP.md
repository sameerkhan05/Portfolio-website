# Netlify Functions Email Setup Guide

## What I Did:

1. **Created Netlify Function** (`netlify/functions/send-email.js`)
   - Serverless function that runs on Netlify
   - Sends emails using Nodemailer
   - No separate server needed!

2. **Updated ContactForm** 
   - Changed from `http://localhost:5002/send-email` 
   - To: `/.netlify/functions/send-email`
   - Works both locally and on deployed site

---

## Environment Variables Setup (CRITICAL!)

You need to add your email credentials to Netlify:

### Step 1: Go to Netlify Dashboard
1. Visit https://app.netlify.com/
2. Click on your site: `bejewelled-meerkat-a6b4a3`

### Step 2: Add Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add these TWO variables:

**Variable 1:**
- Key: `EMAIL_USER`
- Value: email

**Variable 2:**
- Key: `EMAIL_PASS`
- Value: `16digit pass`

4. Click **"Save"**

### Step 3: Redeploy
After adding environment variables:
- Netlify will automatically redeploy
- OR you can trigger manual deploy from "Deploys" tab

---

## Test Locally (Optional)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

This will run your site on `http://localhost:8888/` with Netlify Functions enabled.

---

## Final Steps:

1. Push the new code to GitHub (I'll help with this)
2. Add environment variables in Netlify (follow steps above)
3. Wait for deployment
4. Test contact form on live site!

**Ready to push?**
