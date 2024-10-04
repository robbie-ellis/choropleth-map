document.addEventListener("DOMContentLoaded", () => {
  const EDUCATION_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const COUNTY_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  Promise.all([d3.json(EDUCATION_URL), d3.json(COUNTY_URL)])
    .then((d) => visualize(d[0], d[1]))
    .catch((error) => console.log(error));

  function visualize(educationData, countyData) {
    const geometries = countyData.objects.counties.geometries;
    console.log(geometries);
    const svg = d3.select("svg");

  }

    
});