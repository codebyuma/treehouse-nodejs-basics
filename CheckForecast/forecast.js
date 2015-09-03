// https://api.forecast.io/forecast/f18694d70158b8a1362528c0525e86c9/LATITUDE,LONGITUDE

// https://api.forecast.io/forecast/f18694d70158b8a1362528c0525e86c9/37.8267,-122.423


var https = require("https");
var lat; // store the latitude of the location
var lng; // store the longitude of the location
var theLocation; // store the formatted address of the location

// Print out error messages
function printError(error){

  if (error.syscall == 'connect'){
    console.error("There was an error connecting to this URL. (" + error.code + ").");// could make friendlier message...
  }
  else{
    console.error(error.message);
  } 

}

/* ---- getLocation ---- 
  Using Google's geocode API, use the postal code to get the exact longitude and latitude of the location, plus the formatted address
  Then call getWeather() to get and display the weather and forecast
*/

function getLocation(postal) {
	var getForecast = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + postal + "&key=AIzaSyAsKUZ-rXCvZVU01azEyYMHnYi4fq0ilbs", function (response){
	    var locationBody = "";
	   
	  // Read the data using a data event, 
	    response.on('data', function (chunk){
	      locationBody += chunk;
	    });
	    
	    //will emmit an end event when finished reading the data
	    response.on('end', function(){
	      if (response.statusCode === 200){
	        try {
	          // Parse the data
	          var locationDetails = JSON.parse(locationBody);

	          // Store the data	          
	          lat = (locationDetails.results[0].geometry.location.lat).toString();
	          lng = (locationDetails.results[0].geometry.location.lng).toString();
	          theLocation = (locationDetails.results[0].formatted_address).toString();

	          // Call getWeather() to get and display the weather and forecast
	          getWeather();

	      } catch (error){
	        //Parse error
	        printError(error);
	      }
	     } else {
	      // Status Code error. Create own error object and send.
	        printError({message: "There was an error getting the location details. (" + https.STATUS_CODES[response.statusCode] + ")"});
	     }
	   });
	  
	  // Connection Error
	  getForecast.on("error", printError);
	});
}

/* ---getWeather ---
   using the forecast.io api, get and display the current weather and forecast for a location using the lat and lng variables we 
   calculated in getLocation
*/

function getWeather () {

	 var request = https.get("https://api.forecast.io/forecast/f18694d70158b8a1362528c0525e86c9/" + lat + "," + lng, function (response){
		    var body = "";
		   
		  // Read the data using a data event, 
		    response.on('data', function (chunk){
		      body += chunk;
		    });
		    
		    //will emmit an end event when finished reading the data
		    response.on('end', function(){
		      if (response.statusCode === 200){
		        try {
		          // Parse the data
		          var forecast = JSON.parse(body);

		          // Print the data
		          console.log("The current weather in " + theLocation + " is " + forecast.currently.summary + " and " + forecast.currently.temperature + "°F");
		          console.log("Next 24 Hours: " + forecast.hourly.summary);
		          console.log("Next 7 days: " + forecast.daily.summary);

		      } catch (error){
		        //Parse error
		        printError(error);
		      }
		     } else {
		      // Status Code error. Create own error object and send.
		        printError({message: "There was an error getting the forecast. (" + https.STATUS_CODES[response.statusCode] + ")"});
		     }
		   });
		  
		  // Connection Error
		  request.on("error", printError);
		});
}

// export the getLocation module for use in app.js 
module.exports.getLocation = getLocation; 

