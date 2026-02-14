import { containsProfanity } from './src/utils/badwords.js';

const testCases = [
    "teriii maki chuuuut", // User's specific case
    "ganduuuuu",
    "sh!t happens",
    "f@ck off",
    "hello world", // Should pass
    "class assignment", // Should pass (contains 'ass' but is safe)
    "zhaavadya", // Marathi elongated
    "teri maa ki chut", // Full phrase
    "teri maaaa k cut", // User reported failure
    "teri m k c h ut", // Spaced out
    "lavya aai zavali", // User reported Marathi failure
    "ayi zav lii ch t k", // Spaced-out Marathi
    "valid class assigment" // Should pass even with compressed check optimization potential
];

console.log("--- Profanity Filter Test Results ---");
testCases.forEach(text => {
    const isProfane = containsProfanity(text);
    console.log(`"${text}" -> ${isProfane ? 'BLOCKED 🚫' : 'ALLOWED ✅'}`);
});
