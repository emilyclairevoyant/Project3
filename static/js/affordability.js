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

    // Data for Gini Index
    let giniIndex = [
        countryData['Gini index_2018'],
        countryData['Gini index_2019'],
        countryData['Gini index_2020'],
        countryData['Gini index_2021'],
        countryData['Gini index_2022']
    ];

    // Data for Impoverishing Surgical Care
    let surgCare = [
        countryData['Risk of impoverishing expenditure for surgical care (% of people at risk)_2018'],
        countryData['Risk of impoverishing expenditure for surgical care (% of people at risk)_2019'],
        countryData['Risk of impoverishing expenditure for surgical care (% of people at risk)_2020'],
        countryData['Risk of impoverishing expenditure for surgical care (% of people at risk)_2021'],
        countryData['Risk of impoverishing expenditure for surgical care (% of people at risk)_2022']
    ];

    // Data for Inflation
    let inflation = [
        countryData['Inflation, consumer prices (annual %)_2018'],
        countryData['Inflation, consumer prices (annual %)_2019'],
        countryData['Inflation, consumer prices (annual %)_2020'],
        countryData['Inflation, consumer prices (annual %)_2021'],
        countryData['Inflation, consumer prices (annual %)_2022']
    ];

    // Data for Interest Rate
    let interestRate = [
        countryData['Lending interest rate (%)_2018'],
        countryData['Lending interest rate (%)_2019'],
        countryData['Lending interest rate (%)_2020'],
        countryData['Lending interest rate (%)_2021'],
        countryData['Lending interest rate (%)_2022']
    ];

    // Data for Poverty Ratio
    let povertyRatio = [
        countryData['Multidimensional poverty headcount ratio (World Bank) (% of population)_2018'],
        countryData['Multidimensional poverty headcount ratio (World Bank) (% of population)_2019'],   
        countryData['Multidimensional poverty headcount ratio (World Bank) (% of population)_2020'],
        countryData['Multidimensional poverty headcount ratio (World Bank) (% of population)_2021'],
        countryData['Multidimensional poverty headcount ratio (World Bank) (% of population)_2022']
    ];

   

    // Plot for Gini Index (Visualization 1)
    let trace1 = {
        x: years,
        y: giniIndex,
        type: 'Line',
        mode: 'lines+markers',
        name: 'Gini Index',
        line: {color: 'blue'}
    };

    let layout1 = {
        title: 'Gini Index',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Value' }
    };

    Plotly.newPlot('visualization1', [trace1], layout1);

    // Plot for Impovershing Surgical Care (Visualization 2)
    let trace2 = {
        x: years,
        y: surgCare,
        type: 'Line',
        mode: 'lines+markers',
        name: 'Risk of impoverishing expenditure for surgical care (% of people at risk)',
        line: {color: 'green'}
    };

    let layout2 = {
        title: 'Risk of impoverishing expenditure for surgical care (% of people at risk)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Estimate' }
    };

    Plotly.newPlot('visualization2', [trace2], layout2);

    // Plot for Inflation rate (Visualization 2)
    let trace3 = {
        x: years,
        y: inflation,
        type: 'line',
        mode: 'lines+markers',
        name: 'Inflation, consumer prices (annual %)',
        line: {color: 'pink'}
    };

    let layout3 = {
        title: 'Inflation, consumer prices (annual %)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Annual %' }
    };

    Plotly.newPlot('visualization3', [trace3], layout3);


    // Plot for interest rate (Visualization 4)
    let trace4 = {
        x: years,
        y: interestRate,
        type: 'line',
        mode: 'lines+markers',
        name: 'Lending interest rate (%)',
        line: {color: 'purple'}
    };

    let layout4 = {
        title: 'Lending interest rate (%)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Annual %' }
    };

    Plotly.newPlot('visualization4', [trace4], layout4);

    // Plot for poverty ratio (Visualization 5)
    let trace5 = {
        x: years,
        y: povertyRatio,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Multidimensional poverty headcount ratio (World Bank) (% of population)',
        line: {color: 'purple'}
    };

    let layout5 = {
        title: 'Multidimensional poverty headcount ratio (World Bank) (% of population)',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of population' }
    };

    Plotly.newPlot('visualization5', [trace5], layout5);

}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/affordability_data').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});

// Initialize the dashboard on page load
init(); // Add a closing curly brace here