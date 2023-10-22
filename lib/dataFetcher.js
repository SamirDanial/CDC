const axios = require('axios');

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  data: Object,
});

const CDCData = mongoose.model('CDCData', dataSchema);

const fetchDataFromCDC = async () => {
  try {
    const response = await axios.get('https://data.cdc.gov/api/views/qz99-wyhv/rows.json');
    const responseData = response.data;
    const cdcData = new CDCData({ data: responseData });
    await cdcData.save();
    return cdcData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

module.exports = { fetchDataFromCDC };
