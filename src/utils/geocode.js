// Import
const request = require("request");

// Function Definition
const geocode = (location, callback) => {
  if (!location) {
    return console.log("Must input a location");
  }

  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?access_token=pk.eyJ1IjoibmZlbXoiLCJhIjoiY2p2M3l0cTVyMmxkNzQzbzB1cjg2YmJ1MCJ9.AGures9bdLWbR0yM9i4Tqg&limit=1";

  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        address: response.body.features[0].place_name
      });
    }
  });
};

// Export
module.exports = geocode;
