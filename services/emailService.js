const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, message) => {
    if (!process.env.SENDGRID_API_KEY) {
        console.warn("⚠️ SendGrid API Key missing.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: recipient,
            subject: subject,
            text: message
        });
        console.log("✅ Email Sent Successfully");
    } catch (error) {
        console.error("❌ Email Sending Failed:", error);
    }
};

module.exports = { sendEmail };
