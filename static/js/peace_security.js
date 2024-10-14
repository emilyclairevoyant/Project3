// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/peace_and_security').then((data) => {
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
}

// Function to update the graphs based on the selected country
function updateVisualizations(selectedCountry, data) {
    // Filter data for the selected country
    let countryData = data.find(d => d['Country Name'] === selectedCountry);

    // Extract the required data for the six visualizations
    let years = ['2018', '2019', '2020', '2021', '2022'];

    // Data for Political Stability
    let politicalStability = [
        countryData['Political Stability and Absence of Violence/Terrorism: Estimate_2018'],
        countryData['Political Stability and Absence of Violence/Terrorism: Estimate_2019'],
        countryData['Political Stability and Absence of Violence/Terrorism: Estimate_2020'],
        countryData['Political Stability and Absence of Violence/Terrorism: Estimate_2021'],
        countryData['Political Stability and Absence of Violence/Terrorism: Estimate_2022']
    ];

    // Data for Government Effectiveness
    let govEffectiveness = [
        countryData['Government Effectiveness: Estimate_2018'],
        countryData['Government Effectiveness: Estimate_2019'],
        countryData['Government Effectiveness: Estimate_2020'],
        countryData['Government Effectiveness: Estimate_2021'],
        countryData['Government Effectiveness: Estimate_2022']
    ];

    // Data for Internally Displaced Persons
    let displacedPersons = [
        countryData['Internally displaced persons, total displaced by conflict and violence (number of people)_2018'],
        countryData['Internally displaced persons, total displaced by conflict and violence (number of people)_2019'],
        countryData['Internally displaced persons, total displaced by conflict and violence (number of people)_2020'],
        countryData['Internally displaced persons, total displaced by conflict and violence (number of people)_2021'],
        countryData['Internally displaced persons, total displaced by conflict and violence (number of people)_2022']
    ];

    // Data for Net Migration
    let netMigration = [
        countryData['Net migration_2018'],
        countryData['Net migration_2019'],
        countryData['Net migration_2020'],
        countryData['Net migration_2021'],
        countryData['Net migration_2022']
    ];

    // Data for Voice and Accountability
    let voiceAccountability = [
        countryData['Voice and Accountability: Estimate_2018'],
        countryData['Voice and Accountability: Estimate_2019'],
        countryData['Voice and Accountability: Estimate_2020'],
        countryData['Voice and Accountability: Estimate_2021'],
        countryData['Voice and Accountability: Estimate_2022']
    ];

    // Data for Rule of Law
    let ruleOfLaw = [
        countryData['Rule of Law: Estimate_2018'],
        countryData['Rule of Law: Estimate_2019'],
        countryData['Rule of Law: Estimate_2020'],
        countryData['Rule of Law: Estimate_2021'],
        countryData['Rule of Law: Estimate_2022']
    ];

    // Plot for Political Stability (Visualization 1)
    let trace1 = {
        x: years,
        y: politicalStability,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Political Stability',
        line: {color: 'blue'}
    };

    let layout1 = {
        title: 'Political Stability and Absence of Violence/Terrorism (Estimate)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization1', [trace1], layout1);

    // Plot for Government Effectiveness (Visualization 2)
    let trace2 = {
        x: years,
        y: govEffectiveness,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Government Effectiveness',
        line: {color: 'green'}
    };

    let layout2 = {
        title: 'Government Effectiveness (Estimate)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization2', [trace2], layout2);

    // Plot for Internally Displaced Persons (Visualization 3)
    let trace3 = {
        x: years,
        y: displacedPersons,
        type: 'bar',
        name: 'Displaced Persons',
        marker: {color: 'orange'}
    };

    let layout3 = {
        title: 'Internally Displaced Persons (Number of People)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Number of People' }
    };

    Plotly.newPlot('visualization3', [trace3], layout3);

    // Plot for Net Migration (Visualization 4)
    let trace4 = {
        x: years,
        y: netMigration,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Net Migration',
        line: {color: 'red'}
    };

    let layout4 = {
        title: 'Net Migration',
        xaxis: { title: 'Year' },
        yaxis: { title: 'People' }
    };

    Plotly.newPlot('visualization4', [trace4], layout4);

    // Plot for Voice and Accountability (Visualization 5)
    let trace5 = {
        x: years,
        y: voiceAccountability,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Voice and Accountability',
        line: {color: 'purple'}
    };

    let layout5 = {
        title: 'Voice and Accountability (Estimate)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization5', [trace5], layout5);

    // Plot for Rule of Law (Visualization 6)
    let trace6 = {
        x: years,
        y: ruleOfLaw,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Rule of Law',
        line: {color: 'brown'}
    };

    let layout6 = {
        title: 'Rule of Law (Estimate)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization6', [trace6], layout6);

    // Heatmap combining all key indicators
    let heatmapData = [
        politicalStability, govEffectiveness, displacedPersons, netMigration, voiceAccountability, ruleOfLaw
    ];

    let heatmapTrace = {
        z: heatmapData,
        x: years,
        y: ['Political Stability', 'Gov Effectiveness', 'Displaced Persons', 'Net Migration', 'Voice & Accountability', 'Rule of Law'],
        type: 'heatmap',
        colorscale: 'Viridis'
    };

    let heatmapLayout = {
        title: 'Heatmap of Key Indicators Over Time',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Indicators' }
    };

    Plotly.newPlot('heatmap', [heatmapTrace], heatmapLayout);
}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/peace_and_security').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});

// Initialize the dashboard on page load
init();