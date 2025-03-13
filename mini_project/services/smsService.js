const Twilio = require('twilio');

const sendSMS = async (phoneNumber, message) => {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.warn("⚠️ Twilio credentials missing.");
        return;
    }

    const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
        console.log("✅ SMS Sent Successfully");
    } catch (error) {
        console.error("❌ SMS Sending Failed:", error);
    }
};

module.exports = { sendSMS };
