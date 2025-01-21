const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static('public'));
app.use('/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error: ', err));

app.listen(PORT, () => console.log(`Server running on http://${PORT}`));