require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require('./src/config/firebase-admin');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Crisis Response Backend is Running...');
});

// Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./src/routes/adminRoutes');
app.use("/api", adminRoutes);

/* 🔥 SABSE LAST ME YE ADD KAR */
app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is moving on port ${PORT}`);
});
