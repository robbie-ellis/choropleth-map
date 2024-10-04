document.addEventListener("DOMContentLoaded", () => {
  const EDUCATION_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const COUNTY_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  Promise.all([d3.json(EDUCATION_URL), d3.json(COUNTY_URL)])
    .then((d) => visualize(d[0], d[1]))
    .catch((error) => console.log(error));

  function visualize(educationData, countyData) {
    const w = 1000;
    const h = 700;

    const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    svg.selectAll("path")
      .data(topojson.feature(countyData, countyData.objects.counties).features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", "blue")
      .attr("stroke", "black");
  }

    
});