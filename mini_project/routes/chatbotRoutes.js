const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
    const userMessage = req.body.message;
    const openAIKey = process.env.OPENAI_API_KEY; 

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openAIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ response: "Error processing request" });
    }
});

module.exports = router;