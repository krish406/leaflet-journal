var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

new L.Control.Geocoder().addTo(map);

let markers = [];
let savedMarkers = localStorage.getItem('savedMarkers');
if (savedMarkers) {
    var coordinates = JSON.parse(savedMarkers);
    coordinates.forEach(function(coord) {
        var marker = L.marker(coord).addTo(map);
        markers.push(coord);
        marker.on('click', (evt) => {
            evt.target.remove();
            let coordinates_rem = [evt.latlng.lat, evt.latlng.lng];
            
            let all_coords = localStorage.getItem('savedMarkers');
            all_coords = JSON.parse(all_coords);

            console.log(all_coords);
            
            let index_to_remove = all_coords.findIndex((coord) => {
                return Math.round(coord[0] * 100) === Math.round(coordinates_rem[0] * 100) && Math.round(coord[1] * 100) === Math.round(coordinates_rem[1] * 100);
            });
            
            console.log(index_to_remove);

            if (index_to_remove > -1) { // only splice array when item is found
                all_coords.splice(index_to_remove, 1); // 2nd parameter means remove one item only
            }

            localStorage.setItem('savedMarkers', JSON.stringify(all_coords));
        });
    });
}

//add and delete markers on click
map.on("click", function(e){
    let coordinates = [e.latlng.lat, e.latlng.lng];
    var marker = new L.marker(coordinates).addTo(map)

    //when a marker is clicked it will be removed from local storage and the map
    marker.on('click', (evt) => {
        evt.target.remove();
        let coordinates_rem = [evt.latlng.lat, evt.latlng.lng];
        
        let all_coords = localStorage.getItem('savedMarkers');
        all_coords = JSON.parse(all_coords);

        console.log(all_coords);
        
        let index_to_remove = all_coords.findIndex((coord) => {
            return Math.round(coord[0] * 100) === Math.round(coordinates_rem[0] * 100) && Math.round(coord[1] * 100) === Math.round(coordinates_rem[1] * 100);
        });
        
        console.log(index_to_remove);

        if (index_to_remove > -1) { // only splice array when item is found
            all_coords.splice(index_to_remove, 1); // 2nd parameter means remove one item only
        }

        localStorage.setItem('savedMarkers', JSON.stringify(all_coords));
    });

    markers.push(coordinates);
    console.log(markers);

    localStorage.setItem('savedMarkers', JSON.stringify(markers));
    console.log(localStorage);
})

