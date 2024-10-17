// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");
    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/jobMarket_data').then((data) => {
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
    // Data for Employee Compensation
    let empComp = [
        countryData['Compensation of employees (current LCU)_2018'],
        countryData['Compensation of employees (current LCU)_2019'],
        countryData['Compensation of employees (current LCU)_2020'],
        countryData['Compensation of employees (current LCU)_2021'],
        countryData['Compensation of employees (current LCU)_2022']
    ];
    // Data for Unemployment
    let unemployment = [
        countryData['Unemployment, total (% of total labor force) (national estimate)_2018'],
        countryData['Unemployment, total (% of total labor force) (national estimate)_2019'],
        countryData['Unemployment, total (% of total labor force) (national estimate)_2020'],
        countryData['Unemployment, total (% of total labor force) (national estimate)_2021'],
        countryData['Unemployment, total (% of total labor force) (national estimate)_2022']
    ];
    // Data for Regulatory Quality
    let regQual = [
        countryData['Regulatory Quality: Estimate)_2018'],
        countryData['Regulatory Quality: Estimate_2019'],
        countryData['Regulatory Quality: Estimate_2020'],
        countryData['Regulatory Quality: Estimate_2021'],
        countryData['Regulatory Quality: Estimate_2022']
    ];
    
    // Plot for Employee Compensation (Visualization 1)
    let trace1 = {
        x: years,
        y: empComp,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Compensation of employees (current LCU)',
        line: {color: 'blue'}
    };
    let layout1 = {
        title: 'Compensation of employees (current LCU)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Cash or Cash Estimate'}
    };
    Plotly.newPlot('visualization1', [trace1], layout1);

    // Plot for Unemployment (Visualization 2) using CanvasJS
let chart2 = new CanvasJS.Chart("visualization2", {
    animationEnabled: true,
    title: {
        text: "Unemployment (%)"
    },
    axisX: {
        title: "Year",
    },
    axisY: {
        title: "% of Labor Force Estimate",
        includeZero: true
    },
    data: [{
        type: "column", // "column" for bar charts in CanvasJS
        name: "Unemployment",
        color: "green",
        dataPoints: [
            { label: '2018', y: unemployment[0] },
            { label: '2019', y: unemployment[1] },
            { label: '2020', y: unemployment[2] },
            { label: '2021', y: unemployment[3] },
            { label: '2022', y: unemployment[4] }
        ]
    }]
});
chart2.render();

// Plot for Regulatory Quality (Visualization 3) using CanvasJS
// let chart3 = new CanvasJS.Chart("visualization3", {
//     animationEnabled: true,
//     title: {
//         text: "Regulatory Quality (Opinion on Gov)"
//     },
//     axisX: {
//         title: "Year",
//     },
//     axisY: {
//         title: "Estimate (score std -2.5 to 2.5)",
//         includeZero: true
//     },
//     data: [{
//         type: "column", // "column" for bar charts in CanvasJS
//         name: "Regulatory Quality",
//         color: "orange",
//         dataPoints: [
//             { label: '2018', y: regQual[0] },
//             { label: '2019', y: regQual[1] },
//             { label: '2020', y: regQual[2] },
//             { label: '2021', y: regQual[3] },
//             { label: '2022', y: regQual[4] }
//         ]
//     }]

    // Create data for Plotly
    const trace = {
        x: years,
        y: regQual,
        mode: 'markers+lines', // Show both markers and lines
        type: 'scatter',
        name: 'Regulatory Quality',
        marker: { color: 'orange', size: 10 },
        line: { shape: 'spline' } // Smooth lines
    };

    // Layout configuration
    const layout = {
        title: 'Regulatory Quality (Opinion on Gov)',
        xaxis: { title: 'Year' },
        yaxis: { 
            title: 'Estimate (score std -2.5 to 2.5)',
            range: [-2.5, 2.5] // Include the range you expect
        }
    };

    // Render the plot
    Plotly.newPlot('visualization3', [trace], layout);
// });

// chart3.render();}
}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/jobMarket_data').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});
// Initialize the dashboard on page load
init();