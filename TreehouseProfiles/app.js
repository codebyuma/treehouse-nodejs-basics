// Problem: We need a simple way to look at a user's badge count and Javascript points.
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out.

var profile = require("./profile.js"); // .js at the end is optional. Path is mandatory.

//var users = ["chalkers", "umachandran"];

var users = process.argv.slice(2); // starts at 2 and returns rest

// let's call each item in the array when running forEach, username. 
// usually don't use forEach in browser but ok with  Chrome's V8 
/*users.forEach(function(username){
  profile.get(username);
});

OR shorten to: */

users.forEach(profile.get);

// friendly error message
// make first argument after app.js be the topic area you want the points for
// extract all printing messages out into its own module named printer.

// interact with api from weather site that takes postal code or zip card as argument and prints out today's weather.