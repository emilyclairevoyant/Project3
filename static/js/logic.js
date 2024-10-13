// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered on the world
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

let geojsonLayer;

// Load GeoJSON Data and create a heatmap based on Quality of Life Index
function loadGeoJSON(data, countryData, selectedCountry = null) {
    // Define color based on Quality of Life Index
    function getColor(qol) {
        return qol > 180 ? '#006837' :
               qol > 150 ? '#31a354' :
               qol > 120 ? '#78c679' :
               qol > 90 ? '#c2e699' :
               qol > 60 ? '#ffffcc' :
                          '#ffeda0';
    }

    // Define a style function based on Quality of Life Index
    function style(feature) {
        let country = feature.properties.name;
        let countryInfo = countryData.find(d => d['Country Name'] === country);
        let qol = countryInfo && countryInfo['Quality of Life  '] !== undefined 
            ? countryInfo['Quality of Life  '] 
            : 0;  // Default to 0 if not available

        if (selectedCountry && country !== selectedCountry) {
            return { fillOpacity: 0 }; // Hide countries not selected
        }

        return {
            fillColor: getColor(qol),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    // Remove previous layer
    if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
    }

    // Add GeoJSON layer with the new data and style
    geojsonLayer = L.geoJSON(data, {
        style: style,
        onEachFeature: function (feature, layer) {
            let country = feature.properties.name;
            let countryInfo = countryData.find(d => d['Country Name'] === country);
            let qol = countryInfo && countryInfo['Quality of Life  '] !== undefined 
                ? countryInfo['Quality of Life  '] 
                : 'N/A';

            layer.bindPopup(`${country}<br>Quality of Life: ${qol}`);
        }
    }).addTo(map);

    // If a specific country is selected, fit the map bounds to that country
    if (selectedCountry) {
        let bounds = geojsonLayer.getBounds();
        map.fitBounds(bounds);  // Zoom to the selected country
    }
}

// Function to initialize dropdown and summary info
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve summary info
    d3.json('http://127.0.0.1:5000/summary_info').then((data) => {
        // Extract country names
        let countryNames = data.map(d => d['Country Name']); // Assuming 'Country Name' is the field

        // Populate the dropdown menu with country names
        countryNames.forEach((country) => {
            dropDownMenu.append("option")
                .text(country)
                .property("value", country);
        });

        // Load the GeoJSON data and apply the heatmap
        fetch('../Resources/World_Countries_(Generalized)_9029012925078512962.geojson')
            .then(response => response.json())
            .then(geoData => {
                loadGeoJSON(geoData, data);  // Apply heatmap based on initial data
                // Initialize dashboard with the first country in the list
                let firstCountry = countryNames[0];
                updateSummaryInfo(firstCountry);  // Display the first country's data
            });
    });
}

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

        // Update map for the selected country
        fetch('../Resources/World_Countries_(Generalized)_9029012925078512962.geojson')
            .then(response => response.json())
            .then(geoData => {
                loadGeoJSON(geoData, data, country);  // Reapply heatmap for the selected country
            });
    });
}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    // Get the selected country
    const selectedCountry = d3.select(this).property("value");
    // Update summary info and map when the country changes
    updateSummaryInfo(selectedCountry);
});

// Initialize the dashboard
init();