import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const VISITOR_DOC_PATH = 'analytics/visitorCount';

/**
 * Increment the visitor count in Firestore
 * Only increments once per session to avoid counting page refreshes
 */
export const incrementViewCount = async () => {
    // Check if user has already been counted this session
    const hasVisited = sessionStorage.getItem('portfolio_visited');

    if (hasVisited) {
        console.log('Already counted this session');
        return;
    }

    try {
        const visitorRef = doc(db, VISITOR_DOC_PATH);

        // Check if document exists
        const docSnap = await getDoc(visitorRef);

        if (!docSnap.exists()) {
            // Create initial document
            await setDoc(visitorRef, {
                count: 1,
                lastUpdated: new Date().toISOString()
            });
        } else {
            // Increment existing count
            await setDoc(visitorRef, {
                count: increment(1),
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        }

        // Mark as visited for this session
        sessionStorage.setItem('portfolio_visited', 'true');
        console.log('Visitor count incremented');
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
    }
};

/**
 * Get the current visitor count
 */
export const getViewCount = async () => {
    try {
        const visitorRef = doc(db, VISITOR_DOC_PATH);
        const docSnap = await getDoc(visitorRef);

        if (docSnap.exists()) {
            return docSnap.data().count || 0;
        }
        return 0;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return 0;
    }
};

/**
 * Subscribe to real-time visitor count updates
 * @param {Function} callback - Called with the new count whenever it changes
 * @returns {Function} Unsubscribe function
 */
export const subscribeToViewCount = (callback) => {
    const visitorRef = doc(db, VISITOR_DOC_PATH);

    return onSnapshot(visitorRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().count || 0);
        } else {
            callback(0);
        }
    }, (error) => {
        console.error('Error listening to visitor count:', error);
        callback(0);
    });
};

/**
 * Format large numbers (e.g., 1234 -> "1.2K")
 */
export const formatViewCount = (count) => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};
