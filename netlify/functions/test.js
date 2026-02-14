exports.handler = async (event) => {
    console.log('=== TEST FUNCTION CALLED ===');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', event.httpMethod);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            message: 'Test function works!',
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPass: !!process.env.EMAIL_PASS,
            emailUser: process.env.EMAIL_USER
        })
    };
};
