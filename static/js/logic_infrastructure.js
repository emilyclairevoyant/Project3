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
    const home_button = document.getElementById('Home');
home.addEventListener('click', () => {
    fetch('/')
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);
        });
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
}
//     // Plot for Government Effectiveness (Visualization 2)
//     let trace2 = {
//         x: years,
//         y: govEffectiveness,
//         type: 'scatter',
//         mode: 'lines+markers',
//         name: 'Government Effectiveness',
//         line: {color: 'green'}
//     };

//     let layout2 = {
//         title: 'Government Effectiveness (Estimate)',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'Estimate' }
//     };

//     Plotly.newPlot('visualization2', [trace2], layout2);

//     // Plot for Internally Displaced Persons (Visualization 3)
//     let trace3 = {
//         x: years,
//         y: displacedPersons,
//         type: 'bar',
//         name: 'Displaced Persons',
//         marker: {color: 'orange'}
//     };

//     let layout3 = {
//         title: 'Internally Displaced Persons (Number of People)',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'Number of People' }
//     };

//     Plotly.newPlot('visualization3', [trace3], layout3);

//     // Plot for Net Migration (Visualization 4)
//     let trace4 = {
//         x: years,
//         y: netMigration,
//         type: 'scatter',
//         mode: 'lines+markers',
//         name: 'Net Migration',
//         line: {color: 'red'}
//     };

//     let layout4 = {
//         title: 'Net Migration',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'People' }
//     };

//     Plotly.newPlot('visualization4', [trace4], layout4);

//     // Plot for Voice and Accountability (Visualization 5)
//     let trace5 = {
//         x: years,
//         y: voiceAccountability,
//         type: 'scatter',
//         mode: 'lines+markers',
//         name: 'Voice and Accountability',
//         line: {color: 'purple'}
//     };

//     let layout5 = {
//         title: 'Voice and Accountability (Estimate)',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'Estimate' }
//     };

//     Plotly.newPlot('visualization5', [trace5], layout5);

//     // Plot for Rule of Law (Visualization 6)
//     let trace6 = {
//         x: years,
//         y: ruleOfLaw,
//         type: 'scatter',
//         mode: 'lines+markers',
//         name: 'Rule of Law',
//         line: {color: 'brown'}
//     };

//     let layout6 = {
//         title: 'Rule of Law (Estimate)',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'Estimate' }
//     };

//     Plotly.newPlot('visualization6', [trace6], layout6);

//     // Heatmap combining all key indicators
//     let heatmapData = [
//         politicalStability, govEffectiveness, displacedPersons, netMigration, voiceAccountability, ruleOfLaw
//     ];

//     let heatmapTrace = {
//         z: heatmapData,
//         x: years,
//         y: ['Political Stability', 'Gov Effectiveness', 'Displaced Persons', 'Net Migration', 'Voice & Accountability', 'Rule of Law'],
//         type: 'heatmap',
//         colorscale: 'Viridis'
//     };

//     let heatmapLayout = {
//         title: 'Heatmap of Key Indicators Over Time',
//         xaxis: { title: 'Year' },
//         yaxis: { title: 'Indicators' }
//     };

//     Plotly.newPlot('heatmap', [heatmapTrace], heatmapLayout);
// }

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/infrastructure_data').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});

// Initialize the dashboard on page load
init();