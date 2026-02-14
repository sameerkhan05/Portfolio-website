import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXIMSgV-QvK54xkFym7hn_ZulTU5FLZiw",
    authDomain: "portfolio-visitor-counte-44295.firebaseapp.com",
    projectId: "portfolio-visitor-counte-44295",
    storageBucket: "portfolio-visitor-counte-44295.firebasestorage.app",
    messagingSenderId: "266563642166",
    appId: "1:266563642166:web:37b6cf6b0b1df2e4680997",
    measurementId: "G-VGNG50QP9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
