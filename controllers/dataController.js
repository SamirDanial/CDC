const { fetchDataFromCDC } = require('../lib/dataFetcher');
const mongoose = require('mongoose');

const CDCData = mongoose.model('CDCData');

async function getData(req, res) {
  try {
    let query = {};

    if (req.query.locationType === 'national') {
      query = { 'data.locationType': 'national' };
    } else if (req.query.locationType === 'jurisdictional') {
      query = { 'data.locationType': 'jurisdictional' };
    }

    if (req.query.vaccinationStatus) {
      query['data.vaccinationStatus'] = req.query.vaccinationStatus;
    }

    if (req.query.intent) {
      query['data.intent'] = req.query.intent;
    }

    if (req.query.demographics) {
      query['data.demographics'] = req.query.demographics;
    }

    const data = await CDCData.find(query).exec();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

module.exports = { getData };
