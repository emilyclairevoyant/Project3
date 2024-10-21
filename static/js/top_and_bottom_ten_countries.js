// Fetch the data from the API and process it
d3.json('http://127.0.0.1:5000/summary_info')
    .then((data) => {
        // Filter out entries that don't have a Quality of Life value
        let validData = data.filter(country => country.hasOwnProperty('Quality of Life  ') && !isNaN(country['Quality of Life  ']));

        // Sort the data based on Quality of Life Index values in descending order
        let sortedData = validData.sort((a, b) => b['Quality of Life  '] - a['Quality of Life  ']);

        // Get the top 10 countries
        let top10 = sortedData.slice(0, 10);

        // Get the bottom 10 countries
        let bottom10 = sortedData.slice(-10);

        // Function to display the rankings in a table format
        function displayRankings(rankings, tableId, totalCount, isBottom = false) {
            let tableBody = document.querySelector(`#${tableId} tbody`);

            // Clear any existing content in the table
            tableBody.innerHTML = '';

            // Loop through the rankings and create table rows
            rankings.forEach((country, index) => {
                let rank = isBottom ? totalCount - (rankings.length - index) + 1 : index + 1; // Adjust rank for bottom countries
                let row = `
                    <tr>
                        <td>${rank}</td>  <!-- Rank -->
                        <td>${country['Country Name']}</td>  <!-- Country Name -->
                        <td>${country['Quality of Life  ']}</td>  <!-- Quality of Life Index -->
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }

        // Display top 10 countries
        displayRankings(top10, 'top10', sortedData.length);

        // Display bottom 10 countries
        displayRankings(bottom10, 'bottom10', sortedData.length, true);
    })
    .catch((error) => {
        console.error("Error fetching or processing data:", error);
    });