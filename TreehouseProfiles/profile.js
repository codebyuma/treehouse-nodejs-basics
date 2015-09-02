var http = require("http");

// Print out message
function printMessage(username, badgeCount, points){
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message); 
}

// Print out error messages
function printError(error){
  console.error(error.message);// could make friendlier message... 

}


function get(userName){
  // Connect to the API URL (http://teamtreehouse.com/username.json)
  
  var request = http.get("http://teamtreehouse.com/" + userName + ".json", function (response){
    var body = "";
   //console.log(response.statusCode);
  // Read the data using a data event, 
    response.on('data', function (chunk){
      body += chunk;
    });
    
    //will also emmit an end event when finished reading the data
    response.on('end', function(){
      if (response.statusCode === 200){
        try {
          // Parse the data
          var profile = JSON.parse(body);
          // Print the data
          printMessage(userName, profile.badges.length, profile.points.JavaScript);
      } catch (error){
        //Parse error
        printError(error);
      }
     } else {
      // Status Code error. Create own error object and send.
        printError({message: "There was an error getting the profile for " + userName + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
     }
   });
  });
  
  // request recieves error object, which has a message property
  // use error method on console, as it may display in diff colour on some consoles.
  // Connection Error
  request.on("error", printError);
}

// for this profile module we're creating, we want to export a function called get, which is the get function as above. This is how the function can be used externally. 
module.exports.get = get; 