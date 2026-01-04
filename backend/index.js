const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load isi file .env
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Joki Backend running on port ${PORT}`));