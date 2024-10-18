// Function to initialize the dropdown and load the first country's data into the graphs
function init() {
    let dropDownMenu = d3.select("#countrySelect");

    // Retrieve the data from API
    d3.json('http://127.0.0.1:5000/health').then((data) => {
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

    // Data for Current Health Expenditure
    let healthExpenditure = [
        countryData['Current health expenditure (% of GDP)_2018'],
        countryData['Current health expenditure (% of GDP)_2019'],
        countryData['Current health expenditure (% of GDP)_2020'],
        countryData['Current health expenditure (% of GDP)_2021'],
        countryData['Current health expenditure (% of GDP)_2022']
    ];

    // Data for DPT Immunization
    let dptImmunization = [
        countryData['Immunization, DPT (% of children ages 12-23 months)_2018'],
        countryData['Immunization, DPT (% of children ages 12-23 months)_2019'],
        countryData['Immunization, DPT (% of children ages 12-23 months)_2020'],
        countryData['Immunization, DPT (% of children ages 12-23 months)_2021'],
        countryData['Immunization, DPT (% of children ages 12-23 months)_2022']
    ];

    // Data for Immunization Measles
    let measlesImmunization = [
        countryData['Immunization, measles (% of children ages 12-23 months)_2018'],
        countryData['Immunization, measles (% of children ages 12-23 months)_2019'],
        countryData['Immunization, measles (% of children ages 12-23 months)_2020'],
        countryData['Immunization, measles (% of children ages 12-23 months)_2021'],
        countryData['Immunization, measles (% of children ages 12-23 months)_2022']
    ];

    // Data for Life Expectancy
    let lifeExpectancy = [
        countryData['Life expectancy at birth, total (years)_2018'],
        countryData['Life expectancy at birth, total (years)_2019'],
        countryData['Life expectancy at birth, total (years)_2020'],
        countryData['Life expectancy at birth, total (years)_2021'],
        countryData['Life expectancy at birth, total (years)_2022']
    ];

    // Data for Out-of-pocket expenditure
    let outOfPocket = [
        countryData['Out-of-pocket expenditure (% of current health expenditure)_2018'],
        countryData['Out-of-pocket expenditure (% of current health expenditure)_2019'],
        countryData['Out-of-pocket expenditure (% of current health expenditure)_2020'],
        countryData['Out-of-pocket expenditure (% of current health expenditure)_2021'],
        countryData['Out-of-pocket expenditure (% of current health expenditure)_2022']
    ];

    // Data for Survival to Age 65 (Female)
    let survivalFemale = [
        countryData['Survival to age 65, female (% of cohort)_2018'],
        countryData['Survival to age 65, female (% of cohort)_2019'],
        countryData['Survival to age 65, female (% of cohort)_2020'],
        countryData['Survival to age 65, female (% of cohort)_2021'],
        countryData['Survival to age 65, female (% of cohort)_2022']
    ];

    // Data for Survival to Age 65 (Male)
    let survivalMale = [
        countryData['Survival to age 65, male (% of cohort)_2018'],
        countryData['Survival to age 65, male (% of cohort)_2019'],
        countryData['Survival to age 65, male (% of cohort)_2020'],
        countryData['Survival to age 65, male (% of cohort)_2021'],
        countryData['Survival to age 65, male (% of cohort)_2022']
    ];

    // Plot for Current Health Expenditure (Visualization 1)
    let trace1 = {
        x: years,
        y: healthExpenditure,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Health Expenditure',
        line: { color: 'blue' }
    };

    let layout1 = {
        title: 'Current Health Expenditure (% of GDP)',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of GDP' }
    };

    Plotly.newPlot('visualization1', [trace1], layout1);

    // Use CanvasJS to create the column chart for DPT Immunization (Visualization 2)
    var dptChart = new CanvasJS.Chart("visualization2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Immunization, DPT (% of children ages 12-23 months)"
        },
        axisX: {
            title: "Year",
            interval: 1
        },
        axisY: {
            title: "% of children ages 12-23 months",
            includeZero: true
        },
        data: [{
            type: "column",  // Column chart type
            dataPoints: years.map((year, i) => ({ label: year, y: dptImmunization[i] }))
        }]
    });

    dptChart.render();

    // Use CanvasJS to create the bar chart for Life Expectancy (Visualization 3)
    var lifeExpectancyChart = new CanvasJS.Chart("visualization3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Life Expectancy at Birth (Years)"
        },
        axisX: {
            title: "Year",
            interval: 1
        },
        axisY: {
            title: "Years (age)",
            includeZero: true
        },
        data: [{
            type: "bar",  // Horizontal bar chart
            dataPoints: years.map((year, i) => ({ label: year, y: lifeExpectancy[i] }))
        }]
    });

    lifeExpectancyChart.render();

    // Plot for Out-of-Pocket Expenditure (Visualization 4)
    let trace4 = {
        x: years,
        y: outOfPocket,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Out-of-Pocket Expenditure',
        line: { color: 'red' }
    };

    let layout4 = {
        title: 'Out-of-Pocket Expenditure (% of current health expenditure)',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of current health expenditure' }
    };

    Plotly.newPlot('visualization4', [trace4], layout4);

    // Plot for Survival to Age 65 (Female) (Visualization 5)
    let trace5 = {
        x: years,
        y: survivalFemale,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Survival to Age 65 (Female)',
        line: { color: 'purple' }
    };

    let layout5 = {
        title: 'Survival to Age 65, Female (% of cohort)',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of cohort' }
    };

    Plotly.newPlot('visualization5', [trace5], layout5);

    // Plot for Survival to Age 65 (Male) (Visualization 6)
    let trace6 = {
        x: years,
        y: survivalMale,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Survival to Age 65 (Male)',
        line: { color: 'brown' }
    };

    let layout6 = {
        title: 'Survival to Age 65, Male (% of cohort)',
        xaxis: { title: 'Year' },
        yaxis: { title: '% of cohort' }
    };

    Plotly.newPlot('visualization6', [trace6], layout6);

    // Use CanvasJS to create the chart for Measles Immunization (Visualization 7)
    var measlesChart = new CanvasJS.Chart("visualization7", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Immunization, Measles (% of children ages 12-23 months)"
        },
        axisX: {
            title: "Year",
            interval: 1
        },
        axisY: {
            title: "% of children ages 12-23 months",
            includeZero: true
        },
        data: [{
            type: "column",  // Column chart type
            dataPoints: years.map((year, i) => ({ label: year, y: measlesImmunization[i] }))
        }]
    });

    measlesChart.render();
}

// Event listener for dropdown change
d3.select("#countrySelect").on("change", function() {
    const selectedCountry = d3.select(this).property("value");
    d3.json('http://127.0.0.1:5000/health').then((data) => {
        updateVisualizations(selectedCountry, data);  // Update graphs based on new selection
    });
});

// Initialize the dashboard on page load
init();