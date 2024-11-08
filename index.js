document.addEventListener("DOMContentLoaded", () => {
  const EDUCATION_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const COUNTY_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  Promise.all([d3.json(EDUCATION_URL), d3.json(COUNTY_URL)])
    .then((d) => visualize(d[0], d[1]))
    .catch((error) => console.log(error));

  function visualize(educationData, countyData) {
    const educationPercentages = educationData.map(el => el.bachelorsOrHigher);
    console.log(educationPercentages);
    const w = 1000;
    const h = 700;
    const legendWidth = 200;
    const legendHeight = 60;

    const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    svg.selectAll("path")
      .data(topojson.feature(countyData, countyData.objects.counties).features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("stroke", "black")
      .attr("class", "county")
      .data(educationData)
      .attr("data-fips", (d) => d.fips)
      .attr("data-education", (d) => d.bachelorsOrHigher)
      .attr("fill", (d) => assignColor(d.bachelorsOrHigher, educationPercentages));

    

    svg.append("rect")
      .attr("id", "legend")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("fill", "orange")
      .attr("x", (d) => (w / 3) * 2)
      .attr("y", 10);

    
  }

  function assignColor(data, percentages) {
    const quarter = d3.max(percentages) / 4;
    console.log("Made it")
    if (data <= quarter) {
      return "lightblue";
    } else if (data <= quarter * 2) {
      return "blue";
    } else if (data <= quarter * 3) {
      return "darkblue";
    } else if (data <= quarter * 4) {
      return "purple";
    }
  }

    
});