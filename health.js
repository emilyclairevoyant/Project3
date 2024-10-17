fetch('http://127.0.0.1:5000/dataall')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const countryNames = [...new Set(data.map(item => item['Country Name']))];
           countryNames.forEach(country => {
            const countryData = data.filter(item => item['Country Name'] === country);
            createImmunizationChart(countryData, country);
            createHealthExpenditureChart(countryData, country);
        });
    })
    .catch(error => console.error('Error:', error));

function createChart(data, country) {
    const immunizations = [
        'Immunization, measles (% of children ages 12-23 months)', 
        'Immunization, HepB3 (% of one-year-old children)', 
        'Immunization, DPT (% of children ages 12-23 months)'
    ];
    const years = [2018, 2019, 2020, 2021, 2022];
    const colors = ['slategray', 'palevioletred', 'peachpuff'];

    const chartDiv = d3.select("body").append("div")
        .attr("class", "chart")
        .style("margin-bottom", "50px");

    chartDiv.append("h2").text(`${country} - Immunization Rates`);

    immunizations.forEach((immunization, index) => {
        const pivotData = [];

        years.forEach(year => {
            const columnName = `${immunization}_${year}`;
            const yearData = data.find(item => item['Country Name'] === country);
            if (yearData) {
                pivotData.push({ year, value: yearData[columnName] || 0 });
            }
        });

        console.log(`Pivot Data for ${immunization} in ${country}:`, pivotData);

        const margin = {top: 20, right: 30, bottom: 40, left: 100},
              width = 800 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        const svg = chartDiv.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(years)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(10));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("rect")
            .data(pivotData)
            .enter().append("rect")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", colors[index]);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(immunization);
    });
    Plotly.newplot(visualization1, [trace1], layout 1);
}

      const countryNames = [...new Set(data.map(item => item['Country Name']))];

    
        countryNames.forEach(country => {
            const countryData = data.filter(item => item['Country Name'] === country);
            createChart(countryData, country);
        });
    
    .catch(error => console.error('Error:', error));

function createChart(data, country) {
    const health_expenditure = [
        'Current health expenditure (% of GDP)', 
        'Out-of-pocket expenditure (% of current health expenditure)'
    ];
    const years = [2018, 2019, 2020, 2021, 2022];
    const colors = ['saddlebrown', 'seagreen'];

    const chartDiv = d3.select("body").append("div")
        .attr("class", "chart")
        .style("margin-bottom", "50px");

    chartDiv.append("h2").text(`${country} - Health Expenditure`);

    health_expenditure.forEach((expenditure, index) => {
        const pivotData = [];

        years.forEach(year => {
            const columnName = `${expenditure}_${year}`;
            const yearData = data.find(item => item['Country Name'] === country);
            if (yearData) {
                pivotData.push({ year, value: yearData[columnName] || 0 });
            }
        });

        console.log(`Pivot Data for ${expenditure} in ${country}:`, pivotData);

        const margin = {top: 20, right: 30, bottom: 40, left: 100},
              width = 800 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        const svg = chartDiv.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(years)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(pivotData, d => d.value)])
            .range([height, 0]);

        const line = d3.line()
            .x(d => x(d.year) + x.bandwidth() / 2)
            .y(d => y(d.value));

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(10));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(pivotData)
            .attr("fill", "none")
            .attr("stroke", colors[index])
            .attr("stroke-width", 1.5)
            .attr("d", line);

        svg.selectAll("circle")
            .data(pivotData)
            .enter().append("circle")
            .attr("cx", d => x(d.year) + x.bandwidth() / 2)
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .attr("fill", colors[index]);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(expenditure);
    });
    Plotly.newplot(visualization2, [trace2], layout 2);
}
function createChart(data, country) {
    const survival = [
        'Life expectancy at birth, total (years)',
        'Survival to age 65, male (% of cohort)',
        'Survival to age 65, female (% of cohort)'
        
    ];
    const years = [2018, 2019, 2020, 2021, 2022];
    const colors = ['lemonchiffon', 'plum', 'navy'];

    const chartDiv = d3.select("body").append("div")
        .attr("class", "chart")
        .style("margin-bottom", "50px");

    chartDiv.append("h2").text(`${country} - Survival Rates`);

    survival.forEach((survival, index) => {
        const pivotData = [];

        years.forEach(year => {
            const columnName = `${survival}_${year}`;
            const yearData = data.find(item => item['Country Name'] === country);
            if (yearData) {
                pivotData.push({ year, value: yearData[columnName] || 0 });
            }
        });

        console.log(`Pivot Data for ${survival} in ${country}:`, pivotData);
        const margin = {top: 20, right: 30, bottom: 40, left: 100},
        width = 800 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

  const svg = chartDiv.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.1);

  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10));

  svg.append("g")
      .call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(pivotData)
      .enter().append("rect")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", colors[index]);

  svg.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(survival);
});
Plotly.newplot(visualization3, [trace3], layout 3);
}

