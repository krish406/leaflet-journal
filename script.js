const map = L.map('map').setView([51.505, -0.09], 4);
const sidebar = document.querySelector(".sidebar");

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//add geocoder
new L.Control.Geocoder().addTo(map);

function marker_add_listener(element){
    return element.on('click', (evt) => {
        let coordinates_rem = [evt.latlng.lat, evt.latlng.lng];
        
        //remove from local storage
        let all_coords = localStorage.getItem('savedMarkers');
        all_coords = JSON.parse(all_coords);

        let index_to_remove = all_coords.findIndex((coord) => {
            return Math.round(coord[0] * 100) === Math.round(coordinates_rem[0] * 100) && Math.round(coord[1] * 100) === Math.round(coordinates_rem[1] * 100);
        });
        
        if (index_to_remove > -1) { 
            all_coords.splice(index_to_remove, 1); 
        }

        localStorage.setItem('savedMarkers', JSON.stringify(all_coords));
        evt.target.remove();
    });
}

//add and delete markers on map click
map.on("click", function(e){
    let coordinates = [e.latlng.lat, e.latlng.lng];
    let marker = new L.marker(coordinates).addTo(map);
    let all_markers = JSON.parse(localStorage.getItem('savedMarkers'));

    //when a marker is clicked it will be removed from local storage and the map
    marker_add_listener(marker);
    all_markers.push(coordinates);
    console.log(all_markers);
    localStorage.setItem('savedMarkers', JSON.stringify(all_markers));
    console.log(localStorage);
});

//store and rerender markers
let savedMarkers = localStorage.getItem('savedMarkers');
if(!savedMarkers){
    console.log("hello");
    localStorage.setItem('savedMarkers', '[]');
    console.log(localStorage);
}

savedMarkers = JSON.parse(savedMarkers);
savedMarkers.forEach(function(coord) {
    let marker = L.marker(coord).addTo(map);
    marker_add_listener(marker);
});