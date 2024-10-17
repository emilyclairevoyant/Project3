fetch('http://127.0.0.1:5000/dataall')
  .then(response => response.json())
  .then((data) => {
    const years = ['2018', '2019', '2020', '2021', '2022'];
    const countries = [...new Set(data.map(nation => nation['Country Name']))];
    
    countries.forEach(country => {
        const countryData = data.filter(nation => nation['Country Name']=== country);
        countries.forEach(country => {
            
            for (let i = 1; i <= 8; i++) {
                const divId = `visualization${i}-${country}`;
                if (!document.getElementById(divId)) {
                    const newDiv = document.createElement('div');
                    newDiv.id = divId;
                    document.body.appendChild(newDiv); 
                }
            }

        });
    const survival = 'Life expectancy at birth, total (years)';
    let yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${survival}_${year}`]);
      yaxis.push(entry ? entry[`${survival}_${year}`] : 0);
    });
   
    let trace1 = {
      x: years,
      y: yaxis,
      type: 'bar',
      mode: 'lines+markers',
      marker: { color: 'palevioletred' },
    };

    let layout1 = {
      title: 'Life expectancy at birth, total (years)',
    };

    Plotly.newPlot(`visualization1-${country}`, [trace1], layout1);

    let women_survival = 'Survival to age 65, female (% of cohort)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${women_survival}_${year}`]);
      yaxis.push(entry ? entry[`${women_survival}_${year}`] : 0);
    });

    let trace2 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'bar',
      marker: { color: 'navy' },
    };

    let layout2 = {
      title: 'Survival to age 65, female (% of cohort)',
    };

    Plotly.newPlot(`visualization2-${country}`, [trace2], layout2);

    let men_survival = 'Survival to age 65, male (% of cohort)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${men_survival}_${year}`]);
      yaxis.push(entry ? entry[`${men_survival}_${year}`] : 0);
    });

    let trace3 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'bar',
      marker: { color: 'slategray' },
    };

    let layout3 = {
      title: 'Survival to age 65, male (% of cohort)',
    };

    Plotly.newPlot(`visualization3-${country}`, [trace3], layout3);

    let HepB3 = 'Immunization, HepB3 (% of one-year-old children)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${HepB3}_${year}`]);
      yaxis.push(entry ? entry[`${HepB3}_${year}`] : 0);
    });

    let trace4 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'bar',
      marker: { color: 'saddlebrown' },
    };

    let layout4 = {
      title: 'Immunization, HepB3 (% of one-year-old children)',
    };

    Plotly.newPlot(`visualization4-${country}`, [trace4], layout4);

    let DPT = 'Immunization, DPT (% of children ages 12-23 months)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${DPT}_${year}`]);
      yaxis.push(entry ? entry[`${DPT}_${year}`] : 0);
    });

    let trace5 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'bar',
      marker: { color: 'peachpuff' },
    };

    let layout5 = {
      title: 'Immunization, DPT (% of children ages 12-23 months)',
    };

    Plotly.newPlot('visualization5', [trace5], layout5);

    let Measles = 'Immunization, measles (% of children ages 12-23 months)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${Measles}_${year}`]);
      yaxis.push(entry ? entry[`${Measles}_${year}`] : 0);
    });

    let trace6 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'bar',
      marker: { color: 'pink' },
    };

    let layout6 = {
      title: 'Immunization, measles (% of children ages 12-23 months)',
    };

    Plotly.newPlot(`visualization6-${country}`, [trace6], layout6);

    let GDP_Health = 'Current health expenditure (% of GDP)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${GDP_Health}_${year}`]);
      yaxis.push(entry ? entry[`${GDP_Health}_${year}`] : 0);
    });

    let trace7 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'line',
      marker: { color: 'pink' },
    };

    let layout7 = {
      title: 'Current health expenditure (% of GDP)',
    };

    Plotly.newPlot(`visualization7-${country}`, [trace7], layout7);

    let OOP_Health = 'Out-of-pocket expenditure (% of current health expenditure)';
    yaxis = [];
    years.forEach(year => {
      const entry = countryData.find(parameter => parameter[`${OOP_Health}_${year}`]);
      yaxis.push(entry ? entry[`${OOP_Health}_${year}`] : 0);
    });

    let trace8 = {
      x: years,
      y: yaxis,
      mode: 'lines+markers',
      type: 'line',
      marker: { color: 'slategray' },
    };

    let layout8 = {
      title: 'Out-of-pocket expenditure (% of current health expenditure)',
    };

    Plotly.newPlot(`visualization8-${country}`, [trace8], layout8);
  })
  .catch(error => console.error('Error fetching data:', error));
  })
  function init(){
    let drop = d3.select('#countrySelect');
    d3.json('http://127.0.0.1:5000/dataall').then((data)=>{
        let names= data.map(d=>d['Country Name']);
        names.forEach(country=> {
            drop.append('option')
            .text(country)
            .property('value', country);
        });
        let country1 = names[0];
        updateVisualizations(country1, data);
    });
  }
  init();