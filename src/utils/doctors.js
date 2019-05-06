//Import
const request = require("request");

// Function definition
const doctors = (latitude, longitude, callback) => {
  const apiKey = "0bce314e08632ba47f587d5482585e99";
  const doctorURL =
    "https://api.betterdoctor.com/2016-03-01/doctors?location=" +
    longitude +
    "," +
    latitude +
    "," +
    "100&skip=2&limit=10&user_key=" +
    apiKey;

  request({ url: doctorURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to doctor searching services", undefined);
    } else if (response.body.data.length == 0) {
      callback("Unable to find doctors in this location");
    } else {
      callback(undefined, {
        data: response.body.data
      });
    }
  });
};

// Export
module.exports = doctors;
