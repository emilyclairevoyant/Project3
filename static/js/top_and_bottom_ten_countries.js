// Function to fetch data from the API and populate the tables
async function fetchCountryData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/summary_info');
        const data = await response.json();

        // Function to create table rows
        function createTableRows(countries) {
            return countries.map(country => `
                <tr>
                    <td>${country['Rank']}</td>
                    <td>${country['Country Name']}</td>
                    <td>${country['Quality of Life  ']}</td>
                </tr>
            `).join('');
        }

        // Filter out countries without a 'Quality of Life' index
        const countriesWithQualityOfLife = data.filter(country => country["Quality of Life  "] !== undefined);

        // Sort the countries by 'Quality of Life' in descending order
        countriesWithQualityOfLife.sort((a, b) => b['Quality of Life  '] - a['Quality of Life  ']);

        // Assign dynamic Rank based on the sorted order
        countriesWithQualityOfLife.forEach((country, index) => {
            country['Rank'] = index + 1;
        });

        // Get the top 10 and bottom 10 countries
        const top10Countries = countriesWithQualityOfLife.slice(0, 10);
        const bottom10Countries = countriesWithQualityOfLife.slice(-10);

        // Insert the rows into the respective tables
        document.querySelector('#top10 tbody').innerHTML = createTableRows(top10Countries);
        document.querySelector('#bottom10 tbody').innerHTML = createTableRows(bottom10Countries);

    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

// Call the function to fetch and render the country data
fetchCountryData();