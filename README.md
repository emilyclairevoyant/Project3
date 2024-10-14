# Project3
## An overview of the project and its purpose

Whether going on vacation or planning a move, many individuals worry about their safety and happiness in their new location. Despite a plethora of information on the web – including various articles and videos – people can get overwhelmed when searching for answers on various aspects of the new country and keeping track of the newly acquired information. Not only can it be difficult to research, but a layperson can also find it difficult to understand the surveys and quality of life indexes they do find.

## Instructions on how to use and interact with the project

While exploring our dashboard, it is important that the user takes into consideration current global events and do more research on the country or countries of their choosing. While we utilized data that we all agreed would be most pertinent to determining quality of life, it is not necessarily representative of the current state of the world. We are only capable of visualizing data that is given to us, which ranges from years 2018-2022 due to availability of data provided, and so it is unfortunately not the most up to date representation of each country that we are looking at.

## At least one paragraph summarizing efforts for ethical considerations made in the project

## References for the data source(s)
  
Our data is primarily sourced from the World Bank's Data Catalog. Indicators were selected based on which we thought best indicated quality of life.

Our GEOJSON for country names and coordinates was sourced from https://hub.arcgis.com/datasets/esri::world-countries-generalized/explore .

Our population for each country data was sourced from https://data.worldbank.org/indicator/SP.POP.TOTL

The World Quality Index values data was from World population review https://worldpopulationreview.com/country-rankings/standard-of-living-by-country

## References for any code used that is not your own

It is important to note that while a majority of the data is accurate and sourced from World Bank, some data did have to be interpolated due to missing values. By default Pandas utilizes linear interpolation, so the missing values were estimated as the median of the value above and below it in the respective data frames.

List of tasks for 10/8:

- [x] Common parameters/"series name" between years

- [x] Divvy up categories and subcategories of parameters

- [ ] Begin to finalize analyses to create needed visualizations

List of tasks 10/10:
- [ ] continue HTML base (populate dropdown sample, event clickers?)
- [ ] offical mongo-Java connection (FLASK API)
- [ ] samples/functions for visualizations
- [ ] solidify additional library

## Categories and Sub-categories
1. Health
- Immunization, HepB3 (% of one-year-old children)
- Immunization, DPT (% of children ages 12-23 months)
- Current health expenditure (% of GDP)
- Out-of-pocket expenditure (% of current health expenditure)
- Immunization, measles (% of children ages 12-23 months)
- Life expectancy at birth, total (years)
- Survival to age 65, male (% of cohort)
- Immunization, measles (% of children ages 12-23 months)
- Survival to age 65, female (% of cohort)
2. Family friendly (inclu edu)
- Persistence to last grade of primary, total (% of cohort)
- Share of youth not in education, employment or training, total (% of youth population)
- Primary completion rate, total (% of relevant age group)
- Literacy rate, adult total (% of people ages 15 and above)
- Current education expenditure, total (% of total expenditure in public institutions)
3. Job market
- Compensation of employees (current LCU)
- Unemployment, total (% of total labor force) (national estimate)
- Regulatory Quality: Estimate
4. Affordability
- Risk of impoverishing expenditure for surgical care (% of people at risk)
- Gini index
- Inflation, consumer prices (annual %)
- Lending interest rate (%)
- Multidimensional poverty headcount ratio (World Bank) (% of population)
- 
6. Peace and Security (polit stab, marg groups, etc)
- Women making their own informed decisions regarding sexual relations, contraceptive use and reproductive health care (% of women age 15-49)
- Political Stability and Absence of Violence/Terrorism: Estimate
- Rule of Law: Estimate
- Internally displaced persons, total displaced by conflict and violence (number of people)
- Women participating in the three decisions (own health care, major household purchases, and visiting family) (% of women age 15-49)
- Refugee population by country or territory of asylum
- Voice and Accountability: Estimate
- Control of Corruption: Estimate
- Losses due to theft and vandalism (% of annual sales for affected firms)
- Government Effectiveness: Estimate
- Proportion of seats held by women in national parliaments (%)
- Net migration
7. Infrastructure 
- Mobile cellular subscriptions (per 100 people)
- Access to electricity (% of population)
- Individuals using the Internet (% of population)
- Statistical performance indicators (SPI): Overall score (scale 0-100)
