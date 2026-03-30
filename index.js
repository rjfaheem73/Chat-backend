const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();

        console.log(data); // 👈 IMPORTANT (debug)

        if (!data.choices) {
            return res.json({ error: "No response from AI", full: data });
        }

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (err) {
        res.json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => console.log("Server running"));
