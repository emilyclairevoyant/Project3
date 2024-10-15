function createMap() {
// Create the map object with options.
  let map = L.map('map', {
    center: [20, 0], 
    zoom: 1.5
  });

  // Add OpenStreetMap tile layer
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 8,
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
        // return { color: 'yellowgreen', fillOpacity: 0.0 }; // Initial style
        let countryName = feature.properties.COUNTRY;
        let qualityScore = qualityData.find(q => q.country === countryName)?.StandardOfLiving_QoLScoreNumbeo_2023MidYear;

        // Define a color scale based on qualityScore
        let fillColor;
        if (qualityScore > 150) {
          fillColor = 'green';
        } else if (qualityScore > 100) {
          fillColor = 'yellow';
        } else if (qualityScore > 50) {
          fillColor = 'orange';
        } else {
          fillColor = 'grey';
        }

        return {
          color: 'black',
          weight: 1,
          fillColor: fillColor,
          fillOpacity: 0.2
        };
      }
    }).addTo(map);
  })

  function onEachFeature(feature, layer, qualityData) {
    // define fill color conditional?

    // Highlight the feature on mouseover
    layer.on({
      mouseover: function(e) {
        layer.setStyle({
          fillOpacity: 0.5, // Change opacity to highlight
          // fillColor: fillColor, 
        });
        layer.bringToFront(); // Bring the layer to the front
      },
      mouseout: function(e) {
        layer.setStyle({
          fillOpacity: 0.2, // Reset opacity
          // fillColor: fillColor,
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
                      break;
        }}}} else if (countryname === "Turkiye") {
          // Check if qualityData is an array and find the corresponding country
                if (Array.isArray(qualityData)) {
                  for (let data of qualityData) {
                    if (data.country === "Turkey") { // Check for exact match
                      qualityScore = data.StandardOfLiving_QoLScoreNumbeo_2023MidYear || "Data not available";
                      break;
        }}}}
        else if (countryname === "Côte d'Ivoire") {
          // Check if qualityData is an array and find the corresponding country
                if (Array.isArray(qualityData)) {
                  for (let data of qualityData) {
                    if (data.country === "Ivory Coast") { // Check for exact match
                      qualityScore = data.StandardOfLiving_QoLScoreNumbeo_2023MidYear || "Data not available";
                      break;
        }}}}
        else if (countryname === "Congo DRC") {
          // Check if qualityData is an array and find the corresponding country
                if (Array.isArray(qualityData)) {
                  for (let data of qualityData) {
                    if (data.country === "DR Congo") { // Check for exact match
                      qualityScore = data.StandardOfLiving_QoLScoreNumbeo_2023MidYear || "Data not available";
                      break;
        }}}}
          else {
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


// let geojsonLayer;

// Load GeoJSON Data and create a heatmap based on Quality of Life Index
// function heatmap(data, countryData, selectedCountry = null) {
//     // Define color based on Quality of Life Index
//     function getColor(qol) {
//         return qol > 180 ? '#006837' :
//                qol > 150 ? '#31a354' :
//                qol > 120 ? '#78c679' :
//                qol > 90 ? '#c2e699' :
//                qol > 60 ? '#ffffcc' :
//                           '#ffeda0';
//     }

//     // Define a style function based on Quality of Life Index
//     function style(feature) {
//         let country = feature.properties.name;
//         let countryInfo = countryData.find(d => d['Country Name'] === country);
//         let qol = countryInfo && countryInfo['Quality of Life  '] !== undefined 
//             ? countryInfo['Quality of Life  '] 
//             : 0;  // Default to 0 if not available

//         if (selectedCountry && country !== selectedCountry) {
//             return { fillOpacity: 0 }; // Hide countries not selected
//         }

//         return {
//             fillColor: getColor(qol),
//             weight: 2,
//             opacity: 1,
//             color: 'white',
//             dashArray: '3',
//             fillOpacity: 0.7
//         };
//     }

    // // Remove previous layer
    // if (geojsonLayer) {
    //     map.removeLayer(geojsonLayer);
    // }

    // // Add GeoJSON layer with the new data and style
    // geojsonLayer = L.geoJSON(data, {
    //     style: style,
    //     onEachFeature: function (feature, layer) {
    //         let country = feature.properties.name;
    //         let countryInfo = countryData.find(d => d['Country Name'] === country);
    //         let qol = countryInfo && countryInfo['Quality of Life  '] !== undefined 
    //             ? countryInfo['Quality of Life  '] 
    //             : 'N/A';

    //         layer.bindPopup(`${country}<br>Quality of Life: ${qol}`);
    //     }
    // }).addTo(map);

    // // If a specific country is selected, fit the map bounds to that country
    // if (selectedCountry) {
    //     let bounds = geojsonLayer.getBounds();
    //     map.fitBounds(bounds);  // Zoom to the selected country
    // }
// }

// Function to initialize dropdown and summary info
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve summary info
    d3.json('http://127.0.0.1:5000/summary_info').then((data) => {
        // Extract country names
        let countryNames = data.map(d => d['Country Name']); 

        // Populate the dropdown menu with country names
        countryNames.forEach((country) => {
            dropDownMenu.append("option")
                .text(country)
                .property("value", country);
        });

        // Load the GeoJSON data & update summary 
        // & apply the heatmap
        let geolink = "../Resources/World_Countries_(Generalized)_9029012925078512962.geojson";
        fetch(geolink)
            .then(response => response.json())
            .then(geodata => {
                // heatmap(geodata, data);  // Apply heatmap based on initial data
                // Initialize dashboard with the first country in the list
                let firstCountry = countryNames[0];
                updateSummaryInfo(firstCountry);  // Display the first country's data
            });
        fetch('../Resources/World_Countries_(Generalized)_9029012925078512962.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(geodata => {
            // heatmap(geodata, data);
            let firstCountry = countryNames[0];
            updateSummaryInfo(firstCountry);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }); 
    // });
    })}

// Function to update summary info based on selected country
function updateSummaryInfo(country) {
    // Retrieve the summary info for the selected country
    d3.json('http://127.0.0.1:5000/summary_info').then((data) => {
        // Filter for the selected country
        let selectedCountryData = data.find(item => item['Country Name'] === country);

        // Clear previous summary data
        d3.select("#summary-info").html("");

        // Check if Quality of Life and Rank exist
        let qualityOfLife = selectedCountryData['Quality of Life  '] !== undefined 
            ? selectedCountryData['Quality of Life  '] 
            : 'N/A';
        let rank = selectedCountryData['Rank'] !== undefined ? selectedCountryData['Rank'] : 'N/A';

        // Display summary info for the selected country
        d3.select("#summary-info")
            .append("p").text(`Country Name: ${selectedCountryData['Country Name']}`)
            .append("p").text(`Country Code: ${selectedCountryData['Country Code']}`)
            .append("p").text(`Population: ${selectedCountryData['Population']}`)
            .append("p").text(`Quality of Life (Numbeo 2023): ${qualityOfLife}`)
            .append("p").text(`Rank: ${rank}`);

    //     // Update map for the selected country
    //     fetch('../Resources/World_Countries_(Generalized)_9029012925078512962.geojson')
    //         .then(response => response.json())
    //         .then(geodata => {
    //             heatmap(geodata, data, country);  // Reapply heatmap for the selected country
    //         });
    // });
})}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    // Get the selected country
    const selectedCountry = d3.select(this).property("value");
    // Update summary info and map when the country changes
    updateSummaryInfo(selectedCountry);
});


// run create map function
createMap();
// Initialize the dashboard
init();
