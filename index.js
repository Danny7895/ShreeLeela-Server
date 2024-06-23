const express = require("express");
const cors = require("cors");
const orders = require("./routes/order");
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Define allowed origins
const allowedOrigins = [
  'http://shreeleelahotel.com',
  'http://www.shreeleelahotel.com',
  'https://shreeleelahotel.com',
  'https://www.shreeleelahotel.com',
  'http://localhost', // Adjust this according to your React app's port
  'http://localhost:3036' // Include specific localhost ports if needed
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Allow cookies to be sent and received
};

app.use(cors(corsOptions));

// Middleware to set cookies, placed before routes
app.use((req, res, next) => {
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'None', // Use 'Lax' or 'Strict' if you want to restrict to first-party context
    secure: true,    // 'Secure' is mandatory if 'SameSite' is 'None'
    httpOnly: true,
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Shree Leela Server Started");
});

app.use('/api', orders);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Shree Leela Server Started @ ${port}`);
});
const root = require("path").join(__dirname, "./build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});
