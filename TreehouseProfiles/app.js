// Problem: We need a simple way to look at a user's badge count and Javascript points.
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out.

var profile = require("./profile.js"); // .js at the end is optional. Path is mandatory.

var topic = process.argv.slice(2,3); // take the first argument after app.js as the topic area for points
var users = process.argv.slice(3); // take remaining arguments as the usernames


/* let's call each item in the array when running forEach, username. 
	Usually don't use forEach in browser but ok with  Chrome's V8 
	OR shorten to: users.forEach(profile.get);*/

//For each iem in the users array, get the profile using the username and topic listed.
users.forEach(function(username){
  profile.get(username, topic);
});