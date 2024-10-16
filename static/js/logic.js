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
  // let geolink = "../Resources/World_Countries_(Generalized)_9029012925078512962.geojson";
  d3.json("http://127.0.0.1:5000/geo_json").then(function(geodata) {
    // let geolink = "http://127.0.0.1:5000/countries"; //remove?
  // d3.json(geolink).then(function(geodata) {
    console.log(geodata);
    // CALL qual of life JSON
    // let qualityOfLifeLink = "../Resources/standard-of-living-by-country-_-quality-of-life-by-country-2024.json";
    // d3.json('qualityOfLifeLink').then(function(qualityData) {
      d3.json('http://127.0.0.1:5000/summary_info').then(function(qualityData) {
      console.log(qualityData);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(geodata, {
      onEachFeature: function(feature, layer) {
        onEachFeature(feature, layer, qualityData);
      },
      style: function(feature) {
        let countryname = feature.properties.COUNTRY;
        let selectedCountryData = qualityData.find(item => item['Country Name'] === countryname);
        let qualityScore = selectedCountryData ? selectedCountryData['Quality of Life  '] : 0;
    
        let fillColor;
        if (qualityScore > 150) {
            fillColor = 'green';
        } else if (qualityScore > 100) {
            fillColor = 'yellow';
        } else if (qualityScore > 50) {
            fillColor = 'orange';
        } else if (qualityScore > 0) {
            fillColor = 'red';
        } else {
            fillColor = 'grey'; // Default case
        }
    
        return {
            color: 'black',
            weight: 1,
            fillColor: fillColor,
            fillOpacity: 0.25
        };
    }
      }).addTo(map);})})
  

  function onEachFeature(feature, layer, qualityData) {
    // Highlight the feature on mouseover
    layer.on({
      mouseover: function(e) {
        layer.setStyle({
          fillOpacity: 0.7, // Change opacity to highlight
        });
        layer.bringToFront(); // Bring the layer to the front
      },
      mouseout: function(e) {
        layer.setStyle({
          fillOpacity: 0.25, // Reset opacity
        });
      },
      click: function(e) {
        let countryname = feature.properties.COUNTRY;
        let qualityScore = "Data not available"; // Default value

       // Handle specific country name discrepancies
       if (countryname === "Russian Federation") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Russia")?.['Quality of Life  '] || "Data not available";
    } else if (countryname === "Turkiye") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Turkey")?.['Quality of Life  '] || "Data not available";
    } else if (countryname === "Côte d'Ivoire") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Ivory Coast")?.['Quality of Life  '] || "Data not available";
    } else if (countryname === "Congo DRC") {
        qualityScore = qualityData.find(item => item['Country Name'] === "DR Congo")?.['Quality of Life  '] || "Data not available";
    } else {
        // General case: match country names directly
        let selectedCountryData = qualityData.find(item => item['Country Name'] === countryname);
        if (selectedCountryData) {
            qualityScore = selectedCountryData['Quality of Life  ']|| "Data not available";
        }
    }
        // Bind a popup to show information when clicked
        layer.bindPopup("Country: " + countryname + "<br>Quality of Life Score: " + qualityScore).openPopup();
      }
  });}}


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
        // let geolink = "../Resources/World_Countries_(Generalized)_9029012925078512962.geojson";
        d3.json("http://127.0.0.1:5000/geo_json").then(function(geodata) {
          let geolink = 'http://127.0.0.1:5000/geo_json';
        fetch(geolink)
            .then(response => response.json())
            .then(geodata => {
                // Initialize dashboard with the first country in the list
                let firstCountry = countryNames[0];
                updateSummaryInfo(firstCountry);  // Display the first country's data
            });
        fetch(geolink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(geodata => {
            let firstCountry = countryNames[0];
            updateSummaryInfo(firstCountry);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }); 
    // });
    })});}

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
})}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    // Get the selected country
    const selectedCountry = d3.select(this).property("value");
    // Update summary info when the country changes
    updateSummaryInfo(selectedCountry);
});


// run create map function
createMap();
// Initialize the dashboard
init();
