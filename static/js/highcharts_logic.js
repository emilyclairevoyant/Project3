var data;
var container = document.getElementById('container');

Promise.all([
    d3.csv('../resources/2018_data.csv'),
    d3.csv('../resources/2019_data.csv'),
    d3.csv('../resources/2020_data.csv'),
    d3.csv('../resources/2021_data.csv'),
    d3.csv('../resources/2022_data.csv')
]).then(dataArrays => {
    // Process the data arrays into an object with keys for each country
    data = {};
    dataArrays.forEach(array => {
        array.forEach(item => {
            var country = item['Country Name'];
            if (!data.hasOwnProperty(country)) {
                data[country] = [];
            }
            data[country].push(item);
        });
    });
}) // Close the Promise.all block
.catch(error => {
    console.error('Error:', error);
}); 

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

var containerIds = ['visualization1', 'visualization2', 'visualization3', 'visualization4', 'visualization5'];

function updateCharts() {
    var country = countrySelect.value;

    console.log(country);  // Print out the value of country
    console.log(Object.keys(data));  // Print out the keys of data
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
} // Close the updateCharts function

// Update the charts initially
updateCharts();
