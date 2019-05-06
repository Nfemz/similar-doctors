// Imports
const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const doctors = require("./utils/doctors");

// App Establishments and paths
const app = express();
const port = process.env.PORT || 3000; // Grabs port from what heroku sets; defaults to 3000
const publicPath = path.join(__dirname, "../public");

// Serve static page
app.use(express.static(publicPath));

// Default route
app.get("", (req, res) => {
  res.render("index", {
    title: "Similar Doctors"
  });
});

// Search route
app.get("/doctors", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No valid location entered"
    });
  }

  // Find long/lat from location name
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    // Find doctors from long/lat
    doctors(latitude, longitude, (error, doctorData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        doctor: doctorData
      });
    });
  });
});

// Establish PORT
app.listen(port, () => {
  console.log("Server is successfully running on port", port);
});
