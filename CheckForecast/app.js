// Using the Google geocode API and the forecast.io API, take in a postal code and display the current weather and forecast for that location


var getForecast = require("./forecast.js"); // .js at the end is optional. Path is mandatory.

var postal = process.argv.slice(2,3); // the postal code entered


getForecast.getLocation(postal); // call getLocation in forecast.js