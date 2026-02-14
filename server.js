import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Nodemailer Transporter
// NOTE: For Gmail, you need 'App Password' if 2FA is on.
// Replace with your actual credentials or Environment Variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // User to set this in .env
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Shows "Name" in inbox
        replyTo: email,
        to: 'sameerkhanyt09@gmail.com',
        subject: `Portfolio: ${subject} (from ${name})`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    console.log('Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', mailOptions.to);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        res.status(200).json({ status: 'success', message: 'Email sent!', id: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
        res.status(500).json({ status: 'error', message: 'Failed to send email', error: errorDetails });
    }
});

app.listen(5002, () => {
    console.log(`Server running on port 5002`);
});
