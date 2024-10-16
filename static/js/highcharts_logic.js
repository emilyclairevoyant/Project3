// Get the chart container and the country select elements
var container = document.getElementById('container');
var countrySelect = document.getElementById('country-select');

// Populate the country select with the countries from our data
for (var country in data) {
    var option = document.createElement('option');
    option.value = country;
    option.text = country;
    countrySelect.appendChild(option);
}

// Create the chart
var chart = Highcharts.chart(container, {
    title: {
        text: 'My chart'
    },
    xAxis: {
        categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    },
    series: []
});

// Function to update the chart
function updateChart() {
    // Get the selected country
    var country = countrySelect.value;

    // Remove all series from the chart
    while (chart.series.length > 0) {
        chart.series[0].remove();
    }

    // Add a series for each indicator of the selected country
    for (var indicator in data[country]) {
        chart.addSeries({
            name: indicator,
            data: data[country][indicator]
        });
    }
}

// Update the chart when the selected country changes
countrySelect.addEventListener('change', updateChart);

// Update the chart initially
updateChart();