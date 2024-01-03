require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');

const app = express();

const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-RapidAPI-Key', 'X-RapidAPI-Host'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

const dbURI = process.env.MONGODB_URI;


const fetchAttempts = {}; // Object to store fetch attempts
const MAX_FETCH_ATTEMPTS = 5;


app.get('/', async (req, res) => {
    const xRapidAPIKey = req.headers['x-rapidapi-key'];

    const userId = 'USER'; // Assuming user ID is available in request

    if (!fetchAttempts[userId]) {
      fetchAttempts[userId] = 1;
    } else {
      fetchAttempts[userId]++;
    }
  
    if (fetchAttempts[userId] <= MAX_FETCH_ATTEMPTS) {
    if (
      xRapidAPIKey === KEY
    ) {
      try {
        const products = await Product.find();
        res.status(200).json({ products });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
    }else {
        res.status(429).json({ error: 'Maximum fetch attempts reached for the day.' });
    }
  });
  

mongoose
  .connect(dbURI, {
  })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3500;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


