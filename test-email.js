async function testEmail() {
    try {
        const response = await fetch('http://localhost:5001/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Debug Agent",
                email: "debug@example.com",
                subject: "Test Email from Script",
                message: "This is a test message to debug the email server configuration."
            })
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}

testEmail();
