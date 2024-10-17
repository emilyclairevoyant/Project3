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
  d3.json("http://127.0.0.1:5000/geo_json").then(function(geodata) {
    console.log(geodata);
    // country flags json
    d3.json('http://127.0.0.1:5000/country_flags').then(function(flagsData) {
    // qual of life JSON
      d3.json('http://127.0.0.1:5000/summary_info').then(function(qualityData) {
      console.log(qualityData);
    
    // Create a map of country names to their images
    const flagMap = {};
    flagsData.forEach(item => {
        flagMap[item['country']] = item.flag_base64;
    });
    
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(geodata, {
      onEachFeature: function(feature, layer) {
        onEachFeature(feature, layer, qualityData, flagMap);
      },
      style: function(feature) {
        let countryname = feature.properties.COUNTRY;
        let selectedCountryData = "N/A";
        if (countryname === "Russian Federation") {
          selectedCountryData = qualityData.find(item => item['Country Name'] === "Russia");

        } else if (countryname === "Turkiye") {
          selectedCountryData = qualityData.find(item => item['Country Name'] === "Turkey");
          
        } else if (countryname === "Côte d'Ivoire") {
          selectedCountryData = qualityData.find(item => item['Country Name'] === "Ivory Coast");
          
        } else if (countryname === "Congo DRC") {
          selectedCountryData = qualityData.find(item => item['Country Name'] === "DR Congo");
          
        } else {
          selectedCountryData = qualityData.find(item => item['Country Name'] === countryname);}
        
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
            fillOpacity: 0.4
        };
    }
      }).addTo(map);

      createLegend();
    })})


    function createLegend() {
      let legend = L.control({ position: 'bottomright' });

      legend.onAdd = function () {
          let div = L.DomUtil.create('div', 'info legend');
  
          // Title for the legend
          const title = document.createElement('strong');
          title.innerHTML = 'Quality of Life Score';
          title.style.marginBottom = '5px'; // Space between title and gradient
          div.appendChild(title);
  
          // Create a gradient background for the legend
          const gradientDiv = document.createElement('div');
          gradientDiv.style.background = 'linear-gradient(to right, green, yellow, orange, red, grey)';
          gradientDiv.style.height = '20px'; // Height of the gradient bar
          gradientDiv.style.border = '1px solid #ccc'; // Optional: add a border
          gradientDiv.style.width = '200px'; // Width of the gradient bar
          div.appendChild(gradientDiv);
  
          // Add labels for the legend
          let grades = [0, 50, 100, 150];
          let labels = [];
  
          // Create labels for the grades
          for (let i = 0; i < grades.length; i++) {
              // Determine the color for the label
              let color;
              if (grades[i] === 0) {
                  color = 'red';
              } else if (grades[i] <= 50) {
                  color = 'orange';
              } else if (grades[i] <= 100) {
                  color = 'yellow';
              } else if (grades[i] <= 150) {
                  color = 'green';
              } else {
                  color = 'grey';
              }
  
              labels.push(
                  `<div style="display: flex; align-items: center;">
                      <div style="background:${color}; width: 15px; height: 15px; margin-right: 5px;"></div>
                      <span>${grades[i]}${grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'}</span>
                  </div>`
              );
          }
  
          div.innerHTML += labels.join('');
          return div;
      };
  
      legend.addTo(map);
    }

  function onEachFeature(feature, layer, qualityData, flagMap) {
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
          fillOpacity: 0.4, // Reset opacity
        });
      },
      click: function(e) {
        let countryname = feature.properties.COUNTRY;
        let qualityScore = "Data not available"; // Default value
        let countryFlag = flagMap[countryname] || ""; // Get the flag image from the map

       // Handle specific country name discrepancies
       if (countryname === "Russian Federation") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Russia")?.['Quality of Life  '] || "Data not available";
        countryFlag = flagMap["Russia"] || "";
      } else if (countryname === "Turkiye") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Turkey")?.['Quality of Life  '] || "Data not available";
        countryFlag = flagMap["Turkey"] || "";
      } else if (countryname === "Côte d'Ivoire") {
        qualityScore = qualityData.find(item => item['Country Name'] === "Ivory Coast")?.['Quality of Life  '] || "Data not available";
        countryFlag = flagMap["Ivory Coast"] || "";
      } else if (countryname === "Congo DRC") {
        qualityScore = qualityData.find(item => item['Country Name'] === "DR Congo")?.['Quality of Life  '] || "Data not available";
        countryFlag = flagMap["The Democratic Republic of Congo"] || "";
      } else {
        // General case: match country names directly
        let selectedCountryData = qualityData.find(item => item['Country Name'] === countryname);
        if (selectedCountryData) {
            qualityScore = selectedCountryData['Quality of Life  ']|| "Data not available";
        }
    }
        // Bind a popup to show information when clicked
        // layer.bindPopup("Country: " + countryname + "<br>Quality of Life Score: " + qualityScore).openPopup();
        let popupContent = "Country: " + countryname + "<br>Quality of Life Score: " + qualityScore;
            if (countryFlag) {
                popupContent += "<br><img src='" + countryFlag + "' alt='" + countryname + " flag' style='width: 50px; height: auto;'>";
            }

            layer.bindPopup(popupContent).openPopup();
      }
  });}}
)}


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
        d3.json("http://127.0.0.1:5000/geo_json").then(function(geodata) {
        //         // Initialize dashboard with the first country in the list
                let firstCountry = countryNames[0];
                updateSummaryInfo(firstCountry);  // Display the first country's data
            });
        }); 
    // });
    };

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
            ;

        // Retrieve and display the country flag
        d3.json('http://127.0.0.1:5000/country_flags').then(flagsData => {
          const flagMap = {};
          flagsData.forEach(item => {
              flagMap[item['country']] = item.flag_base64;
          });
          const countryFlag = flagMap[country] || '';
          if (countryFlag) {
              d3.select("#summary-info")
                  .append("img")
                  .attr("src", countryFlag)
                  // .attr("alt", `${country} flag`)
                  .style("width", "50px")
                  .style("height", "auto");
}})
})}

// // Event listener for dropdown change
// d3.select("#countrySelect").on("change", function() {
//     // Get the selected country
//     const newCountry = d3.select(this).property("value");
//     // Update summary info when the country changes
//     updateSummaryInfo(newCountry);
// });


// run create map function
createMap();
// createLegend(); 
// Initialize the dashboard
init();
