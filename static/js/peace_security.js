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
        yaxis: { title: 'Estimate (std -2.5 to 2.5)' }
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
        yaxis: { title: 'Estimate (std -2.5 to 2.5)' }
    };

    Plotly.newPlot('visualization2', [trace2], layout2);

    // Use CanvaJS to create the bar chart for Internally Displaced Persons
    var chart = new CanvasJS.Chart("visualization3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Internally Displaced Persons (Number of People)"
        },
        axisX: {
            title: "Year",
            interval: 1
        },
        axisY: {
            title: "Number of People",
            includeZero: true
        },
        data: [{
            type: "column",  // Change this to "bar" if you prefer horizontal bars
            dataPoints: [
                { label: "2018", y: displacedPersons[0] },
                { label: "2019", y: displacedPersons[1] },
                { label: "2020", y: displacedPersons[2] },
                { label: "2021", y: displacedPersons[3] },
                { label: "2022", y: displacedPersons[4] }
            ]
        }]
    });

    chart.render();

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
        yaxis: { title: 'Number of People' }
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
        yaxis: { title: 'Estimate (std -2.5 to 2.5)' }
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
        yaxis: { title: 'Estimate (std -2.5 to 2.5)' }
    };

    Plotly.newPlot('visualization6', [trace6], layout6);
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