// Function to fetch data from the API and populate the tables
async function fetchCountryData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/summary_info');
        const data = await response.json();

        // Filter out countries without a Quality of Life Index
        const filteredData = data.filter(country => country["Quality of Life  "] !== undefined);

        // Sort countries by Quality of Life Index
        filteredData.sort((a, b) => b['Quality of Life  '] - a['Quality of Life  ']); // Sort descending

        // Get top 10 and bottom 10
        const top10 = filteredData.slice(0, 10);
        const bottom10 = filteredData.slice(-10);

        // Prepare data for DataTable for Top 10
        const top10Data = top10.map((country, index) => ({
            Rank: index + 1, // Assuming the rank is the index + 1 in sorted list
            "Country Name": country["Country Name"],
            "Population": country["Population"],
            "Quality of Life Index": country["Quality of Life  "],
            "Country Code": country["Country Code"]
        }));

        // Prepare data for DataTable for Bottom 10
        const bottom10Data = bottom10.map((country, index) => ({
            Rank: index + 1 + (filteredData.length - bottom10.length), // Adjusting rank for bottom 10
            "Country Name": country["Country Name"],
            "Population": country["Population"],
            "Quality of Life Index": country["Quality of Life  "],
            "Country Code": country["Country Code"]
        }));

        // Populate Top 10 Table
        $('#top10Table').DataTable({
            data: top10Data,
            columns: [
                { title: "Rank", data: "Rank" },
                { title: "Country Name", data: "Country Name" },
                { title: "Population", data: "Population" },
                { title: "Quality of Life Index", data: "Quality of Life Index" },
                { title: "Country Code", data: "Country Code" }
            ]
        });

        // Populate Bottom 10 Table
        $('#bottom10Table').DataTable({
            data: bottom10Data,
            columns: [
                { title: "Rank", data: "Rank" },
                { title: "Country Name", data: "Country Name" },
                { title: "Population", data: "Population" },
                { title: "Quality of Life Index", data: "Quality of Life Index" },
                { title: "Country Code", data: "Country Code" }
            ]
        });
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

// Initialize the dashboard
$(document).ready(function () {
    fetchCountryData(); // Fetch data and populate tables
});