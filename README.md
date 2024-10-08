# Project3
- An overview of the project and its purpose

Whether going on vacation or planning a move, many individuals worry about their safety and happiness in their new location. Despite a plethora of information on the web – including various articles and videos – people can get overwhelmed when searching for answers on various aspects of the new country and keeping track of the newly acquired information. Not only can it be difficult to research, but a layperson can also find it difficult to understand the surveys and quality of life indexes they do find.

- Instructions on how to use and interact with the project

While exploring our dashboard, it is important that the user takes into consideration current global events and do more research on the country or countries of their choosing. While we utilized data that we all agreed would be most pertinent to determining quality of life, it is not necessarily representative of the current state of the world. We are only capable of visualizing data that is given to us, which ranges from years 2018-2022 due to availability of data provided, and so it is unfortunately not the most up to date representation of each country that we are looking at.

- At least one paragraph summarizing efforts for ethical considerations made in the project

- References for the data source(s)
  
Our data is primarily sourced from the World Bank's Data Catalog. Indicators were selected based on which we thought best indicated quality of life.

- References for any code used that is not your own

It is important to note that while a majority of the data is accurate and sourced from World Bank, some data did have to be interpolated due to missing values. By default Pandas utilizes linear interpolation, so the missing values were estimated as the median of the value above and below it in the respective data frames.

List of tasks for 10/8:

[x] Common parameters/"series name" between years
[] Divvy up categories and subcategories of parameters
[] Begin to finalize analyses to create needed visualizations


Common columns for further analysis:
- Inflation, consumer prices (annual %)
- Control of Corruption: Estimate
- Refugee population by country or territory of asylum
- Survival to age 65, female (% of cohort)
- Regulatory Quality: Estimate
- Immunization, HepB3 (% of one-year-old children)
- Proportion of seats held by women in national parliaments (%)
- Current health expenditure (% of GDP)
- Current education expenditure, total (% of total expenditure in public institutions)
- Immunization, DPT (% of children ages 12-23 months)
- Women participating in the three decisions (own health care, major household purchases, and visiting family) (% of women age 15-49)
- Immunization, measles (% of children ages 12-23 months)
- Statistical performance indicators (SPI): Overall score (scale 0-100)
- Lending interest rate (%)
- Government Effectiveness: Estimate
- Individuals using the Internet (% of population)
- Unemployment, total (% of total labor force) (national estimate)
- Losses due to theft and vandalism (% of annual sales for affected firms)
- Women making their own informed decisions regarding sexual relations, contraceptive use and reproductive health care (% of women age 15-49)
- Rule of Law: Estimate
- Access to electricity (% of population)
- Voice and Accountability: Estimate
- Gini index
- Compensation of employees (current LCU)
- Internally displaced persons, total displaced by conflict and violence (number of people)
- Persistence to last grade of primary, total (% of cohort)
- Net migration
- Out-of-pocket expenditure (% of current health expenditure)
- Risk of impoverishing expenditure for surgical care (% of people at risk)
- Life expectancy at birth, total (years)
- Political Stability and Absence of Violence/Terrorism: Estimate
- Survival to age 65, male (% of cohort)
- Multidimensional poverty headcount ratio (World Bank) (% of population)
- Primary completion rate, total (% of relevant age group)
- Mobile cellular subscriptions (per 100 people)
- Share of youth not in education, employment or training, total (% of youth population)
- Literacy rate, adult total (% of people ages 15 and above)
