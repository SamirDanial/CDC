const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const { fetchDataFromCDC } = require('./lib/dataFetcher');

const app = express();

connectDB();

(async () => {
    try {
      await fetchDataFromCDC();
    } catch (error) {
      console.error('Error running data fetch on server startup:', error);
    }
  })();

cron.schedule('0 0 * * *', async () => {
    try {
      await fetchDataFromCDC();
    } catch (error) {
      console.error('Error running data fetch cron job:', error);
    }
  });

app.use(express.json({ extended: false }));
app.use('/api', require('./routes/data'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));