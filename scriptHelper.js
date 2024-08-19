// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    document.getElementById("missionTarget").innerHTML =
        `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
  `
}

function validateInput(testInput) {

    if (testInput.length == 0) {
        return "Empty";

    } else if (isNaN(testInput)) {
        return "Not a Number";
    }
    else {
        return "Is a Number";
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchCondition = true;
    let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert("Missing Required Fields");
    }

    if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        alert("Pilots have to be string values!");
    }

    if (validateInput(cargoLevel) === 'Not a Number' || validateInput(fuelLevel) === 'Not a Number') {
        alert("fuelLevel and cargoMass must be a numerical value!");
    }

    if (fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch"
        launchCondition = false;
    }
    else {
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch"
    }
    if (cargoLevel > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch"
        launchCondition = false;

    }
    else {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch"
        launchStatus.style.color = "green"
        launchStatus.innerHTML = "Shuttle is Ready for Launch"
    }

    list.style.visibility = "visible"

    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`

    if (launchCondition) {
        launchStatus.style.color = "green"
        launchStatus.innerHTML = "Shuttle is Ready for Launch"
    }
    else {
        launchStatus.style.color = "red"
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;