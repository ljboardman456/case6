"use strict";

// create a Room class to manage room information (e.g., Canyon, Javelina)
function Room(name, pricePerDay) {
    this.name = name;
    this.pricePerDay = pricePerDay;

    // method to calculate total cost based on number of days
    this.calculateCost = function(days) {
        return this.pricePerDay * days;
    };
}

// create instances for the Canyon and Javelina rooms
const canyonRoom = new Room("Canyon Room", 149.99);
const javelinaRoom = new Room("Javelina Room", 127.99);

// exception handling for form validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
    // clear any previous error messages
    let errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = "";

    // flag to track if any errors are found
    let hasError = false;

    // check if the name is entered
    let name = document.getElementById("myName").value.trim();
    if (name === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Name is required.</p>";
    }

    // check if the email is valid
    let email = document.getElementById("myEmail").value.trim();
    if (email === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Email is required.</p>";
    } else {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            hasError = true;
            errorMessages.innerHTML += "<p>Please enter a valid email address.</p>";
        }

        // check if the email is from a forbidden domain (e.g., gmail.com)
        let forbiddenDomain = "gmail.com"; // set the forbidden domain
        let emailDomain = email.split('@')[1]; // extract the domain part from the email
        if (emailDomain === forbiddenDomain) {
            hasError = true;
            errorMessages.innerHTML += "<p>Email addresses from gmail.com are not allowed.</p>";
        }
    }

    // check if the date is selected
    let date = document.getElementById("myDate").value;
    if (date === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Date is required.</p>";
    }

    // check if at least one room type is selected
    let roomTypes = document.querySelectorAll('input[name="Canyon"], input[name="Javelina"]');
    let roomSelected = false;
    roomTypes.forEach(function(room) {
        if (room.checked) {
            roomSelected = true;
        }
    });
    if (!roomSelected) {
        hasError = true;
        errorMessages.innerHTML += "<p>Please select at least one room type.</p>";
    }

    // if any errors were found, prevent form submission
    if (hasError) {
        event.preventDefault();
    }
});

// function to get the current time and set a greeting
function setGreeting() {
    let greetingText;
    let currentHour = new Date().getHours(); // get the current hour (0-23)

    if (currentHour < 12) {
        greetingText = "Good morning!"; // if hour is before noon it is morning
    } else if (currentHour < 18) {
        greetingText = "Good afternoon!"; // this will display afternoon if before 6 pm
    } else {
        greetingText = "Good evening!"; // everything else is set as evening, including night hours
    }

    document.getElementById("greeting").textContent = greetingText; // display greeting
}

// run function when page loads
window.onload = setGreeting;

// added function to initialize map and geolocation
function initMap() {
    // checks if geolocation is supported
    if (navigator.geolocation) {
      // gets current position
      navigator.geolocation.getCurrentPosition(showPosition, showError); // uses geolocation to get position
    } else {
      alert("Geolocation is not supported by this browser."); // alert if geolocation not supported
    }
  }
  
  // added function to display map and position data
  function showPosition(position) {
    const lat = position.coords.latitude; // stores latitude
    const lng = position.coords.longitude; // stores longitude
    const alt = position.coords.altitude !== null ? position.coords.altitude : "Not available"; // stores altitude or fallback
  
    document.getElementById("latitude").textContent = lat; // displays latitude
    document.getElementById("longitude").textContent = lng; // displays longitude
    document.getElementById("altitude").textContent = alt; // displays altitude
  
    const userLocation = { lat: lat, lng: lng }; // creates location object
  
    const map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation, // centers map on user
      zoom: 15, // sets zoom level
    }); // creates the google map
  
    new google.maps.Marker({
      position: userLocation,
      map: map,
      title: "You are here",
    }); // places a marker on the user location
  }
  
  // added function to handle geolocation errors
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation."); // shows permission error
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable."); // shows location unavailable error
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out."); // shows timeout error
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred."); // shows unknown error
        break;
    }
  }
  