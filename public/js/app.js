// Test console log to ensure client side javascript is working properly
console.log("Clientside JavaScript is loaded");

// Search form constants
const doctorForm = document.querySelector("#doctor-form");
const locationSearch = document.querySelector("#location-search");

// Default rendered information
const status = document.querySelector("#status");
status.textContent = "";

// Event listener on the submit button
doctorForm.addEventListener("submit", e => {
  // Stops default refresh behavior
  e.preventDefault();

  // Removes previously loaded doctor data if any
  document.getElementById("doctors-container").innerHTML = "";

  // Grabs search criteria for location box
  const location = locationSearch.value;

  // Loading information
  status.textContent = "Currently loading doctor data. Please wait...";

  // Fetch http response and render data
  fetch("http://localhost:3000/doctors?address=" + location).then(response => {
    response.json().then(res => {
      // Removes loading information
      status.textContent = "";

      // Default output
      let output = `<h3>Displaying Nearest Doctors</h3>`;

      // Loops through array and displays doctors
      if (!res.error) {
        res.doctor.data.forEach(doctor => {
          output += `
          <div id='doctor-box'>
            <h4 id="doctor-name">
              ${doctor.profile.first_name + " " + doctor.profile.last_name}
              </h4>
            <p id="doctor-special">
              ${doctor.specialties[0].name}
            </p>
            <p id="doctor-address">
              ${doctor.practices[0].visit_address.street +
                ", " +
                doctor.practices[0].visit_address.city +
                ", " +
                doctor.practices[0].visit_address.state_long}
            </p>
            <p id="doctor-phone">
              ${doctor.practices[0].phones[0].number}
            </p>
          </div>
          `;
        });
      } else {
        output = `<h3>Invalid location entered. Please try again</h3`;
      }
      document.getElementById("doctors-container").innerHTML = output;
    });
  });
});
