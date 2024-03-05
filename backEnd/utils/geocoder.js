const NodeGeocoder = require('node-geocoder');
const dotenv = require("dotenv");

//Load ENV variables
dotenv.config({ path : "./config/config.env" });
console.log(process.env.GEOCODER_PROVIDER)

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);
console.log({geocoder})

module.exports = geocoder;