fetch('http://127.0.0.1:5000/data2')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createChart(data, 'Immunization, measles (% of children ages 12-23 months)', 'Measles', 'slategray');
        createChart(data, 'Immunization, HepB3 (% of one-year-old children)', 'HepB3', 'palevioletred');
        createChart(data, 'Immunization, DPT (% of children ages 12-23 months)', 'DPT', 'peachpuff');
    })
    .catch(error => console.error('Error:', error));

const developedcountries = [
    'Austria', 'Belgium', 'Denmark', 'Finland', 'France', 'Germany', 'Greece', 
    'Ireland', 'Italy', 'Luxembourg', 'Netherlands', 'Portugal', 'Spain', 
    'Sweden', 'United Kingdom', 'Bulgaria', 'Croatia', 'Cyprus', 
    'Czech Republic', 'Estonia', 'Hungary', 'Latvia', 'Lithuania', 
    'Malta', 'Poland', 'Romania', 'Slovakia', 'Slovenia', 'Iceland', 
    'Norway', 'Switzerland', 'Australia', 'Canada', 'Japan', 
    'New Zealand', 'United States'
];

function createChart(data, columnName, vaccine, color) {
    const pivotData = {};

    data.forEach(item => {
        const countryName = item['Country Name'];
        if (developedcountries.includes(countryName)) {
            if (!pivotData[countryName]) {
                pivotData[countryName] = { 'Country Name': countryName };
            }
            pivotData[countryName][vaccine] = item[columnName] || 0;
        }
    });

    const sortedImmunizationData = Object.values(pivotData).map(country => ({
        'Country Name': country['Country Name'],
        [vaccine]: Number(country[vaccine]) || 0
    }));

    sortedImmunizationData.sort((a, b) => a['Country Name'].localeCompare(b['Country Name']));

    const margin = {top: 20, right: 30, bottom: 40, left: 100},
          width = 800 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(sortedImmunizationData.map(d => d['Country Name']))
        .range([0, height])
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(10));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(sortedImmunizationData)
        .enter().append("rect")
        .attr("x", 0)
        .attr("y", d => y(d['Country Name']))
        .attr("width", d => x(d[vaccine]))
        .attr("height", y.bandwidth())
        .attr("fill", color);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(`${vaccine} Immunization Rates`);
}

