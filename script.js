'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation) {

    // My device geolocation is not working att all :(
    /*navigator.geolocation.getCurrentPosition(function (position) {
        // const { latitude } = position.coords;
        // const { longitude } = position.coords;
    }, function () {
        alert('Could not get your position');
    });*/

    // Set lat and lang manually because my device is sucked !
    const latitude = 35.7018071;
    const longitude = 51.3984517;

    // Store current coords in a variable
    const coords = [latitude, longitude];

    // Display map on page
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

    // Handling clicks on map
    map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    });

}

form.addEventListener('submit', (e) => {
    // prevent page from getting reloaded
    e.preventDefault();

    // Clear all fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

    // Display marker on map
    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                maxHeight: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            })
        )
        .setPopupContent('Workout!')
        .openPopup();

})

inputType.addEventListener('change', function (e) {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})