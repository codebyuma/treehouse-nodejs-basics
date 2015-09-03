
var getForecast = require("./forecast.js"); // .js at the end is optional. Path is mandatory.

var postal = process.argv.slice(2,3);


getForecast.getLocation(postal);