var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Load the data set from the assets folder:
  d3.csv(
    "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091"
  ).then(function (data) {
    // Add X axis
    console.log(data)
    var x = d3.scaleLinear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d['Horsepower(HP)'] })]),
    	d3.max([0,d3.max(data,function (d) { return d['Horsepower(HP)'] })])
    	])
    .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 80])
    .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d['Horsepower(HP)']);
      })
      .attr("cy", function (d) {
        return y(d['City Miles Per Gallon']);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");
  });
};
