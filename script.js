var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

new L.Control.Geocoder().addTo(map);

let markers = [];

//add and delete markers on click
map.on("click", function(e){
    let coordinates = [e.latlng.lat, e.latlng.lng];
    var marker = new L.marker(coordinates).addTo(map).on('click', e => e.target.remove());
    markers.push(coordinates);
    console.log(markers);

    localStorage.setItem('savedMarkers', JSON.stringify(markers));
    console.log(localStorage);
})

