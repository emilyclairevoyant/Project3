// Mapping for country name discrepancies between GeoJSON and parameters data
let countryNameMapping = {
<<<<<<< HEAD
    "Vietnam": "Viet Nam",
    "Korea (Republic of)": "South Korea",
    "Yemen": "Yemen, Rep.",
    "Iran": "Iran, Islamic Rep.",
    "Venezuela": "Venezuela, RB",
    "Egypt": "Egypt, Arab Rep.",
    "Congo DRC": "Congo, Dem. Rep.",
    "Syria" : "Syrian Arab Republic",
    "Kyrgyzstan": "Kyrgyz Republic",
    "Slovakia": "Slovak Republic",
    "Czech Republic": "Czechia",
  };
  
  // Create a global variable for the legend so we can update it dynamically
  let legend;
  
  // Function to create the map and handle parameter selection
  function createMap() {
    let map = L.map('map', {
        center: [20, 0],
        zoom: 1.5
    });
  
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    //   let geolink = fetch('C:\Users\ambmd\OneDrive\Desktop\proj3_testing\Project3\Resources\World_Countries.geojson')
  
    d3.json("http://127.0.0.1:5000/geo_json").then(function(geodata) {
        let parametersDataLink = "http://127.0.0.1:5000/parameters";
        d3.json(parametersDataLink).then(function(parametersData) {
            let excludedKeys = ['Country Name', 'Country Code','_id'];
            let parameterKeys = Object.keys(parametersData[0]).filter(key => !excludedKeys.includes(key));
            let dropDownMenu = d3.select("#parameterSelect");
  
            // Populate the dropdown with parameter names
            parameterKeys.forEach((param) => {
                dropDownMenu.append("option")
                    .text(param)
                    .property("value", param);
            });
  
            // Initial render with the first parameter
            let selectedParameter = parameterKeys[0];
            updateMapWithParameter(map, geodata, parametersData, selectedParameter);
  
            // Update map when parameter changes
            d3.select("#parameterSelect").on("change", function() {
                selectedParameter = d3.select(this).property("value");
                updateMapWithParameter(map, geodata, parametersData, selectedParameter);
            });
        });
    });
  
    // Add a blank legend to the map (this will be updated dynamically)
    legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = '<h5>Legend</h5>';
        return div;
    };
    legend.addTo(map);
  }
  
  // Function to update the map with parameter-based colors and dynamic legend
  function updateMapWithParameter(map, geodata, parametersData, selectedParameter) {
    map.eachLayer(function(layer) {
        if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer);
        }
    });
  
    let values = parametersData.map(d => d[selectedParameter]).filter(v => v != null);
    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);
  
    L.geoJson(geodata, {
        onEachFeature: function(feature, layer) {
            let countryName = feature.properties.COUNTRY;
  
            // Apply country name mapping if necessary
            let mappedCountryName = countryNameMapping[countryName] || countryName;
  
            // Find the country data using the mapped or original country name
            let countryData = parametersData.find(d => d["Country Name"] === mappedCountryName);
  
            let parameterValue = countryData ? countryData[selectedParameter] : null;
            let fillColor = getColorByValue(parameterValue, minValue, maxValue);
  
            layer.setStyle({
                color: 'black',
                weight: 1,
                fillColor: fillColor,
                fillOpacity: 0.75
            });
  
            // Bind popup to show parameter info
            layer.bindPopup("Country: " + mappedCountryName + "<br>" + selectedParameter + ": " + (parameterValue !== null ? parameterValue : "Data not available"));
        }
    }).addTo(map);
  
    // Update the legend dynamically based on the selected parameter
    updateLegend(minValue, maxValue, selectedParameter);
  }
  
  // Helper function to determine color based on parameter value
  function getColorByValue(value, minValue, maxValue) {
    if (value == null) {
        return 'grey';
    }
    let normalizedValue = (value - minValue) / (maxValue - minValue);
    return d3.interpolateRdYlGn(normalizedValue);  // Color gradient from red to green
  }
  
  // Helper function to update the legend dynamically
  function updateLegend(minValue, maxValue, parameter) {
    let legendDiv = legend.getContainer();
    
    // Clear the previous content
    legendDiv.innerHTML = `<h5>${parameter}</h5>`;
  
    // Create legend labels based on min/max values
    let grades = [minValue, (minValue + maxValue) / 2, maxValue];  
    let labels = grades.map(grade => {
        return `<i style="background:${getColorByValue(grade, minValue, maxValue)}"></i> ${Math.round(grade)}`;
    });
  
    // Add labels to the legend
    legendDiv.innerHTML += labels.join('<br>');
  }
  
  // Initialize the map
  createMap();
=======
  "Vietnam": "Viet Nam",
  "Korea (Republic of)": "South Korea",
  "Yemen": "Yemen, Rep.",
  "Iran": "Iran, Islamic Rep.",
  "Venezuela": "Venezuela, RB",
  "Egypt": "Egypt, Arab Rep.",
  "Congo DRC": "Congo, Dem. Rep.",
  "Syria" : "Syrian Arab Republic",
  "Kyrgyzstan": "Kyrgyz Republic",
  "Slovakia": "Slovak Republic",
  "Czech Republic": "Czechia",
};

// Create a global variable for the legend so we can update it dynamically
let legend;

// Function to create the map and handle parameter selection
function createMap() {
  let map = L.map('map', {
      center: [20, 0],
      zoom: 1.5
  });

  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 8,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let geolink = "../Resources/World_Countries_(Generalized)_9029012925078512962.geojson";

  d3.json(geolink).then(function(geodata) {
      let parametersDataLink = "http://127.0.0.1:5000/parameters";
      d3.json(parametersDataLink).then(function(parametersData) {
          let excludedKeys = ['Country Name', 'Country Code','_id'];
          let parameterKeys = Object.keys(parametersData[0]).filter(key => !excludedKeys.includes(key));
          let dropDownMenu = d3.select("#parameterSelect");

          // Populate the dropdown with parameter names
          parameterKeys.forEach((param) => {
              dropDownMenu.append("option")
                  .text(param)
                  .property("value", param);
          });

          // Initial render with the first parameter
          let selectedParameter = parameterKeys[0];
          updateMapWithParameter(map, geodata, parametersData, selectedParameter);

          // Update map when parameter changes
          d3.select("#parameterSelect").on("change", function() {
              selectedParameter = d3.select(this).property("value");
              updateMapWithParameter(map, geodata, parametersData, selectedParameter);
          });
      });
  });

  // Add a blank legend to the map (this will be updated dynamically)
  legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = '<h5>Legend</h5>';
      return div;
  };
  legend.addTo(map);
}

// Function to update the map with parameter-based colors and dynamic legend
function updateMapWithParameter(map, geodata, parametersData, selectedParameter) {
  map.eachLayer(function(layer) {
      if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
      }
  });

  let values = parametersData.map(d => d[selectedParameter]).filter(v => v != null);
  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);

  L.geoJson(geodata, {
      onEachFeature: function(feature, layer) {
          let countryName = feature.properties.COUNTRY;

          // Apply country name mapping if necessary
          let mappedCountryName = countryNameMapping[countryName] || countryName;

          // Find the country data using the mapped or original country name
          let countryData = parametersData.find(d => d["Country Name"] === mappedCountryName);

          let parameterValue = countryData ? countryData[selectedParameter] : null;
          let fillColor = getColorByValue(parameterValue, minValue, maxValue);

          layer.setStyle({
              color: 'black',
              weight: 1,
              fillColor: fillColor,
              fillOpacity: 0.75
          });

          // Bind popup to show parameter info
          layer.bindPopup("Country: " + mappedCountryName + "<br>" + selectedParameter + ": " + (parameterValue !== null ? parameterValue : "Data not available"));
      }
  }).addTo(map);

  // Update the legend dynamically based on the selected parameter
  updateLegend(minValue, maxValue, selectedParameter);
}

// Helper function to determine color based on parameter value
function getColorByValue(value, minValue, maxValue) {
  if (value == null) {
      return 'grey';
  }
  let normalizedValue = (value - minValue) / (maxValue - minValue);
  return d3.interpolateRdYlGn(normalizedValue);  // Color gradient from red to green
}

// Helper function to update the legend dynamically
function updateLegend(minValue, maxValue, parameter) {
  let legendDiv = legend.getContainer();
  
  // Clear the previous content
  legendDiv.innerHTML = `<h5>${parameter}</h5>`;

  // Create legend labels based on min/max values
  let grades = [minValue, (minValue + maxValue) / 2, maxValue];  
  let labels = grades.map(grade => {
      return `<i style="background:${getColorByValue(grade, minValue, maxValue)}"></i> ${Math.round(grade)}`;
  });

  // Add labels to the legend
  legendDiv.innerHTML += labels.join('<br>');
}

// Initialize the map
createMap();
>>>>>>> 82d3323b8d02cb66997c383eafbfc3fe365f6532
