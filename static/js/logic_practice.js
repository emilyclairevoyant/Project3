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
  let geolink = "../Resources/World_Countries_(Generalized)_9029012925078512962.geojson";
  // let link = "/Resources/countries-land-5km.geojson";
  d3.json(geolink).then(function(geodata) {
    console.log(geodata)
    let qualityOfLifeLink = "../Resources/standard-of-living-by-country-_-quality-of-life-by-country-2024.json";
    d3.json(qualityOfLifeLink).then(function(qualityData) {
      console.log(qualityData);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(geodata, {
      onEachFeature: function(feature, layer) {
        onEachFeature(feature, layer, qualityData);
      },
      style: function(feature) {
        return { color: 'green', fillOpacity: 0.1 }; // Initial style
      }
    }).addTo(map);
  });

  function onEachFeature(feature, layer, qualityData) {
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
        // Country name
        let countryname = feature.properties.COUNTRY;
        let qualityScore = "Data not available"; // Default value

        if (countryname === "Russian Federation") {
          // Check if qualityData is an array and find the corresponding country
          if (Array.isArray(qualityData)) {
              for (let data of qualityData) {
                  if (data.country === "Russia") { // Check for exact match
                      qualityScore = data.StandardOfLiving_QoLScoreNumbeo_2023MidYear || "Data not available";
        }}}} else {
          // Check if qualityData is an array and find the corresponding country
          if (Array.isArray(qualityData)) {
          for (let data of qualityData) {
            if (data.country === countryname) {
              qualityScore = data.StandardOfLiving_QoLScoreNumbeo_2023MidYear || "Data not available";
              break; // Exit the loop once found
            }
          }
        }}
        // Bind a popup to show information when clicked
        layer.bindPopup("Country: " + countryname + "<br>Quality of Life Score: " + qualityScore).openPopup();
      }
  })}});}

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