// Create a map object
const map = L.map('map').setView([20, 0], 2); // Centered on the world

// Add a tile layer (you can choose any tile provider)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Load the GeoJSON data
fetch('Resources\World_Countries_(Generalized)_9029012925078512962.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a GeoJSON layer and add it to the map
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Add popups with country names
                layer.bindPopup(feature.properties.name);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));