require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const methodOverride = require('method-override');
const axios = require('axios');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// ✅ Rate Limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
}));

// ✅ Configure CORS
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST'],
    credentials: true
}));

// ✅ Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// ✅ Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/users', userRoutes);
app.use('/weather', weatherRoutes);
app.use('/chatbot-response', chatbotRoutes);

// OpenAI API Backend Proxy Route
app.post('/chatbot-response', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botResponse = response.data.choices[0].message.content;
        res.json({ response: botResponse });
    } catch (error) {
        console.error("Error fetching OpenAI response:", error);
        res.status(500).json({ response: "Sorry, I'm unable to process your request." });
    }
});

// ✅ Home Route
app.get("/", (req, res) => {
    res.send("Weather Forecast App is Running...");
});

// ✅ Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
