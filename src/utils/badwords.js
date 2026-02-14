// Comprehensive list of banned words (English & Hindi/Hinglish)
// This list is used to filter abusive contact form submissions.

export const BANNED_WORDS = [
    // English Profanity
    'abuse',
    'idiot',
    'stupid',
    'fail',
    'scam',
    'fake',
    'ugly',
    'dumb',
    'ass',
    'asshole',
    'bastard',
    'bitch',
    'bloody',
    'crap',
    'cunt',
    'damn',
    'dick',
    'douche',
    'fag',
    'fuck',
    'fucker',
    'fucking',
    'fack',
    'fuk',
    'fvck',
    'piss',
    'pussy',
    'shit',
    'slut',
    'whore',

    // Hindi/Hinglish Profanity (Common variations)
    'bc',
    'mc',
    'bkl',
    'mkc',
    'bhosdike',
    'bhosda',
    'gand',
    'gandu',
    'chutia',
    'chutiya',
    'choot',
    'kamina',
    'kamine',
    'harami',
    'haramkhor',
    'behenchod',
    'madarchod',
    'bhadwa',
    'bhadwe',
    'randi',
    'saala',
    'saale',
    'kutw',
    'kutta',
    'kutiya',
    'lauda',
    'loda',
    'lawda',
    'chut',
    'gaand',
    'tatti',
    'jhaatu',
    'jhatu',
    'tmkc',
    'teri maa',
    'teri ma',
    'ma ki chut',
    'maa ki chut',
    'ma k cut',
    'maa k cut',

    // Marathi Profanity
    'zhavadya',
    'foknichya',
    'bhadkhau',
    'lavdya',
    'chinal',
    'rand',
    'gand',
    'aai ghalya',
    'bulli',
    'shembdya',
    'yedzhavya',
    'bullya',
    'lavya',
    'zhavli',
    'zavali',
    'aai zhavli',
    'aai zavali',
    'ayi',
    'chutka'
];

// Helper to normalize text (remove special chars, leet speak, repeated chars)
const normalizeText = (text) => {
    return text
        .toLowerCase()
        .replace(/@/g, 'a')
        .replace(/\$/g, 's')
        .replace(/!/g, 'i')
        .replace(/1/g, 'i')
        .replace(/0/g, 'o')
        .replace(/3/g, 'e')
        .replace(/\./g, '')
        .replace(/(.)\1+/g, '$1') // Collapse repeated characters (e.g., "uuu" -> "u")
        .replace(/\s+/g, ' '); // collapse spaces
};

export const containsProfanity = (text) => {
    const normalized = normalizeText(text);

    // Check against banned words
    return BANNED_WORDS.some(word => {
        // Escape for regex
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // 1. Exact match on normalized text (handles "ganduuuu" -> "gandu")
        // We use word boundaries to avoid false positives on short words in some cases,
        // but for longer abusive words, straightforward inclusion might be needed if they are concatenated.

        // Try precise match first
        const regex = new RegExp(`\\b${safeWord}\\b`, 'i');
        if (regex.test(normalized)) return true;

        // 2. Substring match for longer words (length > 3) to catch "gandumaster" if "gandu" is banned
        // This is riskier for short words like "ass" (c-ass-e), so we only do it for distinctively offensive terms.
        if (word.length > 3 && normalized.includes(word)) return true;

        // 3. Spaced-out check (e.g., "c h u t" -> "chut")
        // Remove ALL spaces from normalized text and check for exact match of the BAD WORD inside it.
        // We only do this for words > 3 chars to avoid false positives like "class" -> "ass" (since "a s s" -> "ass").
        // But "class" with no spaces is "class". "ass" is in "class". 
        // So we must be careful.
        // If we strip spaces, "t e r i m k c h u t" -> "terimkchut".
        // "chut" is in "terimkchut".
        // This is valid for abusive words.
        // BUT "c l a s s" -> "class". "ass" is in "class".
        // We should only do this if the word is NOT a common substring of valid words? 
        // Or just rely on length heuristic?
        // Let's rely on length > 3 for now. "chut" is 4. "fuck" is 4. "gand" is 4.
        // "ass" is 3. So "ass" won't trigger this check, avoiding "class" FP.

        const compressed = normalized.replace(/\s/g, '');
        if (word.length > 3 && compressed.includes(word)) return true;

        return false;
    });
};
