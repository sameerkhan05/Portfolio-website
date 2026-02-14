# Firebase Setup Guide for Profile Visitor Counter

Follow these steps to get your Firebase credentials:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name: `portfolio-visitor-counter` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this feature)
6. Click **Create project**
7. Wait for setup to complete, then click **Continue**

## Step 2: Create Web App

1. In your Firebase project dashboard, click the **Web icon** `</>`
2. Register your app with nickname: `Portfolio Website`
3. **Do NOT check** "Also set up Firebase Hosting"
4. Click **Register app**

## Step 3: Get Configuration Credentials

You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**Copy this entire `firebaseConfig` object.** You'll need it in the next step.

## Step 4: Enable Firestore Database

1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll set rules next)
4. Choose your location (select closest to your users, e.g., `us-central` or `asia-south1`)
5. Click **Enable**

## Step 5: Configure Firestore Security Rules

1. Go to **"Firestore Database"** → **"Rules"** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to visitor count for everyone
    match /analytics/visitorCount {
      allow read: if true;
      allow write: if false; // Only server/admin can write
    }
    
    // Allow increment operations from client
    match /analytics/{document=**} {
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['count', 'lastUpdated']);
    }
  }
}
```

3. Click **Publish**

---

## ✅ You're Done!

Once you've completed these steps, paste your `firebaseConfig` object here and I'll integrate it into your portfolio.
