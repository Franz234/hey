var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");

  // Load the data set from the assets folder:
  var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2;

  var g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal([
    "gray",
    "green",
    "brown",
    "orange",
    "yellow",
    "red",
    "purple",
  ]);

  var pie = d3.pie().value(function (d) {
    return d.percent;
  });

  var path = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);

  d3.csv("https://cdn.glitch.global/cd8c69a3-09de-42d9-8c2b-baee6d9e8d44/population.csv?v=1667658674785", function (error, data) {
    if (error) {
      throw error;
    }
    
    var arc = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", function (d) {
        return color(d.data.states);
      });

    console.log(arc);

    arc
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
      })

      .text(function (d) {
        return d.data.states;
      });
  });

  svg
    .append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .text("Top population states in india")
    .attr("class", "title");
};
