// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/infrastructure_data').then((data) => {
        // Extract country names (assuming 'Country Name' is the field)
        let countryNames = data.map(d => d['Country Name']);

        // Populate the dropdown with country names
        countryNames.forEach((country) => {
            dropDownMenu.append("option")
                .text(country)
                .property("value", country);
        });

        // Load data for the first country by default
        let firstCountry = countryNames[0];
        updateVisualizations(firstCountry, data);  // Display graphs for the first country
    });

};

// Function to update the graphs based on the selected country
function updateVisualizations(selectedCountry, data) {
    // Filter data for the selected country
    let countryData = data.find(d => d['Country Name'] === selectedCountry);

    // Extract the required data for the six visualizations
    let years = ['2018', '2019', '2020', '2021', '2022'];

    // Data for Political Stability
    let cellularSubscription = [
        countryData['Mobile cellular subscriptions (per 100 people)_2018'],
        countryData['Mobile cellular subscriptions (per 100 people)_2019'],
        countryData['Mobile cellular subscriptions (per 100 people)_2020'],
        countryData['Mobile cellular subscriptions (per 100 people)_2021'],
        countryData['Mobile cellular subscriptions (per 100 people)_2022']
    ];

    // Data for Government Effectiveness
    let electricityAccess = [
        countryData['Access to electricity (% of population)_2018'],
        countryData['Access to electricity (% of population)_2019'],
        countryData['Access to electricity (% of population)_2020'],
        countryData['Access to electricity (% of population)_2021'],
        countryData['Access to electricity (% of population)_2022']
    ];

    // Data for Internally Displaced Persons
    let internetUsers = [
        countryData['Individuals using the Internet (% of population)_2018'],
        countryData['Individuals using the Internet (% of population)_2019'],
        countryData['Individuals using the Internet (% of population)_2020'],
        countryData['Individuals using the Internet (% of population)_2021'],
        countryData['Individuals using the Internet (% of population)_2022']
    ];

    // Data for Net Migration
    let spi = [
        countryData['Statistical performance indicators (SPI): Overall score (scale 0-100)_2018'],
        countryData['Statistical performance indicators (SPI): Overall score (scale 0-100)_2019'],
        countryData['Statistical performance indicators (SPI): Overall score (scale 0-100)_2020'],
        countryData['Statistical performance indicators (SPI): Overall score (scale 0-100)_2021'],
        countryData['Statistical performance indicators (SPI): Overall score (scale 0-100)_2022']
    ];


    // Plot for Political Stability (Visualization 1)
    let trace1 = {
        x: years,
        y: cellularSubscription,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Cellular Subscriptions',
        line: {color: 'blue'}
    };

    let layout1 = {
        title: 'Cellular Subscriptions per 100 people',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization1', [trace1], layout1);

    // Plot for Government Effectiveness (Visualization 2)
    let trace2 = {
        x: years,
        y: electricityAccess,
        type: 'bar',
        name: 'Electric Access',
        marker: {color: 'green'}
    };

    let layout2 = {
        title: 'Electricity Access (%)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization2', [trace2], layout2);

    // Plot for Internally Displaced Persons (Visualization 3)
    let trace3 = {
        x: years,
        y: internetUsers,
        type: 'bar',
        name: 'Internet Users',
        marker: {color: 'orange'}
    };

    let layout3 = {
        title: 'Internet Users (%)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Number of People' }
    };

    Plotly.newPlot('visualization3', [trace3], layout3);

    // Plot for Net Migration (Visualization 4)
    let trace4 = {
        x: years,
        y: spi,
        type: 'scatter',
        mode: 'lines+markers',
        name:  'SPI',
        line: {color: 'red'}
    };

    let layout4 = {
        title: 'Statistical performance indicators (SPI)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'People' }
    };

    Plotly.newPlot('visualization4', [trace4], layout4);
}



// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/infrastructure_data').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});



// Initialize the dashboard on page load
init();