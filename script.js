var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

new L.Control.Geocoder().addTo(map);

map.on("click", function(e){
    var marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).on('click', e => e.target.remove());
    marker.className = "hello";
    console.log(marker);
})