// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/FamFr_data').then((data) => {
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

    // Data for Persistence to last grade of primary, total (%)
    let persPrimary = [
        countryData['Persistence to last grade of primary, total (% of cohort)_2018'],
        countryData['Persistence to last grade of primary, total (% of cohort)_2019'],
        countryData['Persistence to last grade of primary, total (% of cohort)_2020'],
        countryData['Persistence to last grade of primary, total (% of cohort)_2021'],
        countryData['Persistence to last grade of primary, total (% of cohort)_2022']
    ];

    // Data for Share of youth not in education, employment or training, total (%)
    let NEET = [
        countryData['Share of youth not in education, employment or training, total (% of youth population)_2018'],
        countryData['Share of youth not in education, employment or training, total (% of youth population)_2019'],
        countryData['Share of youth not in education, employment or training, total (% of youth population)_2020'],
        countryData['Share of youth not in education, employment or training, total (% of youth population)_2021'],
        countryData['Share of youth not in education, employment or training, total (% of youth population)_2022']
    ];

    // Data for Primary completion rate
    let primCompl = [
        countryData['Primary completion rate, total (% of relevant age group)_2018'],
        countryData['Primary completion rate, total (% of relevant age group)_2019'],
        countryData['Primary completion rate, total (% of relevant age group)_2020'],
        countryData['Primary completion rate, total (% of relevant age group)_2021'],
        countryData['Primary completion rate, total (% of relevant age group)_2022']
    ];

    // Data for Literacy rate
    let LitRate = [
        countryData['Literacy rate, adult total (% of people ages 15 and above)_2018'],
        countryData['Literacy rate, adult total (% of people ages 15 and above)_2019'],
        countryData['Literacy rate, adult total (% of people ages 15 and above)_2020'],
        countryData['Literacy rate, adult total (% of people ages 15 and above)_2021'],
        countryData['Literacy rate, adult total (% of people ages 15 and above)_2022']
    ];

    // Data for Current education expenditure
    let EdExpend = [
        countryData['Current education expenditure, total (% of total expenditure in public institutions)_2018'],
        countryData['Current education expenditure, total (% of total expenditure in public institutions)_2019'],
        countryData['Current education expenditure, total (% of total expenditure in public institutions)_2020'],
        countryData['Current education expenditure, total (% of total expenditure in public institutions)_2021'],
        countryData['Current education expenditure, total (% of total expenditure in public institutions)_2022']
    ];

    // Plot for Persistence to last grade of primary (Visualization 1)
    let trace1 = {
        x: years,
        y: persPrimary,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Persistance to Last Grade of Primary',
        line: {color: 'blue'}
    };

    let layout1 = {
        title: 'Persistance to Last Grade of Primary',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of cohort' }
    };

    Plotly.newPlot('visualization1', [trace1], layout1);

    // Plot for Share of youth not in education, employment or training (Visualization 2)
    let trace2 = {
        x: years,
        y: NEET,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'NEET',
        line: {color: 'green'}
    };

    let layout2 = {
        title: 'Youth not in education, employment or training',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of youth population'}
    };

    Plotly.newPlot('visualization2', [trace2], layout2);

    // Plot for Primary completion rate (Visualization 3)
    let trace3 = {
        x: years,
        y: primCompl,
        type: 'bar',
        name: 'Primary Compl',
        marker: {color: 'orange'}
    };

    let layout3 = {
        title: 'Primary Completion Rate',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of relevant age group' }
    };

    Plotly.newPlot('visualization3', [trace3], layout3);

    // Plot for Literacy rate, adult (Visualization 4)
    let trace4 = {
        x: years,
        y: LitRate,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Literacy Rate',
        line: {color: 'red'}
    };

    let layout4 = {
        title: 'Literacy Rate',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of people ages 15 and above' }
    };

    Plotly.newPlot('visualization4', [trace4], layout4);

    // Plot for Current education expenditure (Visualization 5)
    let trace5 = {
        x: years,
        y: EdExpend,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Current education expenditure',
        line: {color: 'purple'}
    };

    let layout5 = {
        title: 'Current education expenditure',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of total expenditure in public institutions' }
    };

    Plotly.newPlot('visualization5', [trace5], layout5);

}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/FamFr_data').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});

// Initialize the dashboard on page load
init();