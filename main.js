var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
  
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  
  var valueline = d3.line()
  .x(function(d) { return x(d['Retail Price']); })
  .y(function(d) { return y(d['Dealer Cost']); });
  
  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
  // Load the data set from the assets folder:
  d3.csv("https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091").then(function (data) {
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d['Retail Price']; }));
    y.domain([0, d3.max(data, function(d) { return d['Dealer Cost']; })]);
    // Add the valueline path.
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);
    // Add the scatterplot
    svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return x(d['Retail Price']); })
    .attr("cy", function(d) { return y(d['Dealer Cost']); });
    // Add the X Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
    .call(d3.axisLeft(y));
  });
};
