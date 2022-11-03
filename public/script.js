"use strict";

function initMap(coordinates) {
    const myLatLng = coordinates;
    // { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatLng,
    });
  
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
}
window.initMap = initMap;

function updateLocation() {
    axios.get('http://api.open-notify.org/iss-now.json')
        .then(function(response) {
            const position = response.data.iss_position;
            updateLocationElement(position)
            window.initMap({lat: +position.latitude, lng: +position.longitude});
        })
        .catch(function(error) {
            console.log(error);
        });
}

function updateLocationElement(position) {
    const element = document.getElementById('location');
    element.innerHTML = 
        'longitude: ' + position.longitude 
        + ', latitude: ' + position.latitude;
}

function updateTime() {
    const date = new Date();
    const elementTime = document.getElementById('time');
    elementTime.innerHTML = 
        String(date.getUTCHours()).padStart(2, '0') + ':' 
        + String(date.getUTCMinutes()).padStart(2, '0');
    const elementDate = document.getElementById('date');
    elementDate.innerHTML = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function updatePeople() {
    axios.get('http://api.open-notify.org/astros.json')
        .then(function(response) {
            const data = response.data;
            updatePeopleElement(data)
            
        })
        .catch(function(error) {
            console.log(error);
        })
}

function updatePeopleElement(data) {
    const listElement = document.getElementById('people-list');
    const newNodes = [];
    for (let person of data.people) {
        const element = document.createElement('div');
        element.classList = "person";
        element.innerHTML = "<img src='./static/person.png'><span>" + person.name + "</span>";
        newNodes.push(element);
    }
    listElement.replaceChildren(...newNodes);
    const summaryElement = document.getElementById('people-summary');
    summaryElement.innerHTML = 'Total amount: ' + data.number + ' people on ISS';
}

function updateData() {
    updateLocation();
    updateTime();
    updatePeople();
}

setInterval(updateData, 5000);
updateData();