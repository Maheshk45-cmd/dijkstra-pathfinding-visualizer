require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphRoutes = require('./src/routes/graph');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/graph', graphRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
};

startServer();
