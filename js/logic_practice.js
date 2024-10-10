function createMap() {
  // Create the map object with options.
  let map = L.map('map-id', {
    center: [20, 0], 
    zoom: 2
  });

  // Add OpenStreetMap tile layer
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, {}, {
    collapsed: false
  }).addTo(map);

  // Load GeoJSON data
  let link = "Resources/World_Countries_(Generalized)_9029012925078512962.geojson";
  // let link = "/Resources/countries-land-5km.geojson";
  d3.json(link).then(function(data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      onEachFeature: onEachFeature,
      style: function(feature) 
      {
        return { color: 'orange', fillOpacity: 0.1 }; // Initial style
      }
    }).addTo(map);
  });

  function onEachFeature(feature, layer) {
    // Highlight the feature on mouseover
    layer.on({
      mouseover: function(e) {
        layer.setStyle({
          fillOpacity: 0.5 // Change opacity to highlight
        });
        layer.bringToFront(); // Bring the layer to the front
      },
      mouseout: function(e) {
        layer.setStyle({
          fillOpacity: 0.1 // Reset opacity
        });
      },
      click: function(e) {
        // Bind a popup to show information when clicked
        // layer.bindPopup("Information: " + feature.properties.info).openPopup();
        layer.bindPopup("Information:", feature.features[0].properties.COUNTRY).openPopup();
        // layer.bindPopup("Information:", properties.COUNTRY).openPopup();
      }
    });

    // Bind a popup to show information when clicked
    layer.bindPopup(feature.properties.name); // Change 'name' to the property you want to show
  }
}

// Call createMap with appropriate data
createMap(); 


// function createMarkers(response) {
//   // Pull the "stations" property from response.data.
//   let stations = response.data.stations;

//   // Initialize an array to hold bike markers.
//   let bikeMarkers = [];

//   // Loop through the stations array.
//   for (let index = 0; index < stations.length; index++) {
//     let station = stations[index];

//     // For each station, create a marker, and bind a popup with the station's name.
//     let bikeMarker = L.marker([station.lat, station.lon])
//       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

//     // Add the marker to the bikeMarkers array.
//     bikeMarkers.push(bikeMarker);
//   }

//   // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//   createMap(L.layerGroup(bikeMarkers));
// }


// // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);