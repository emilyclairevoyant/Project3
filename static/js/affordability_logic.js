// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");
    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/affordability_data').then((data) => {
        // Extract country names (assuming 'Country Name' is the field)
        let countryNames = data.map(d => d['Country Name']);
        // Populate the dropdown with country names
        countryNames.forEach((country) => {
            dropDownMenu.append("option")
                .text(country)
                .property("value", country);
        });
        let matchedResults = {};
        // Loop through the data
        data.forEach(item => {
        // Check each regex pattern against the item name
        regexPatterns.forEach(regex => {
          if (regex.test(item.name)) {
            matchedResults[item.id] = item; // Store the matched item
          }
        });
        // Load data for the first country by default
        let firstCountry = matchedResults[0];
    });
 })
};

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/infrastructure_data').then((data) => {
        createChart(selectedCountry, data);  // Update graphs based on new selection
    });
});
// Initialize the dashboard on page load
init();

var containerIds = ['visualization1', 'visualization2', 'visualization3', 'visualization4', 'visualization5'];

function createChart(containerId, matchedResults) {
     console.log('Creating chart with:');
     console.log('containerId:', [containerId.map('')]);
    // console.log('title:', title);
     console.log('categories:', matchedResults.keys);
     console.log('data:', matchedResults.value);

    Highcharts.chart(containerId, {
        // title: {
        //     text: title
        // },
        xAxis: {
            categories: matchedResults.keys
        },
        series: [{
            name: title,
            data: matchedResults.value
        }]
    });
} // Close the createChart function

var containerIds = ['visualization1', 'visualization2', 'visualization3', 'visualization4', 'visualization5'];

function updateCharts() {
    let countryData = data.find(d => d['Country Name'] === selectedCountry);

    console.log(countryData);  // Print out the value of country
    console.log(Object.keys());  // Print out the keys of data
    console.log(data.hasOwnProperty(country));  // Check if country is a key in data

    // Remove all existing charts
    containerIds.forEach(id => {
        var container = document.getElementById(id);
        while (container.firstChild) {
            container.firstChild.remove();
        }5
    });

    // Create a new chart for each indicator
    var i = 0;
    for (var indicator in data[country]) {
        if (i >= containerIds.length) {
            break;  // Don't create more charts than there are containers
        }

        var containerId = containerIds[i];
        createChart(containerId, indicator, ['2018', '2019', '2020', '2021', '2022'], data[country][indicator]);
        i++;
    }
} 

function createChart(containerId, title, categories, data) {
    console.log('Creating chart with:');
    console.log('containerId:', containerId);
    console.log('title:', title);
    console.log('categories:', categories);
    console.log('data:', data);

    Highcharts.chart(containerId, {
        title: {
            text: title
        },
        xAxis: {
            categories: categories
        },
        series: [{
            name: title,
            data: data
        }]
    });
} // Close the createChart function