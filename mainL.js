var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 60, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  var x = d3.scaleLinear().domain([0, 200]).range([0, width]);
  var y = d3.scaleLinear().domain([0, 70]).range([height, 0]);
  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv(
    "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091"
  ).then(function (data) {
    
    // Add X axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size","14px")
      .call(d3.axisBottom(x));

    // Text label for the x axis 
    // Source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom)
        .style("text-anchor", "middle")
        .style("font-size","18px")
        .text("Retail Price [1000 $]");
    
    // Add Y axis
    svg
      .append("g")
      .style("font-size","14px")
      .call(d3.axisLeft(y));
    
    // Text label for the y axis 
    // Source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","18px")
        .text("City Miles Per Gallon [MPG]");

    // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Sedan", "SUV", "Sports Car", "Wagon", "Minivan"])
    .range(d3.schemeSet2);
    
    // Add a shape type
    var myShape = d3.scaleOrdinal()
    .domain(["Sedan", "SUV", "Sports Car", "Wagon", "Minivan"])
    .range(d3.schemeSet2);
    
    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d["Retail Price"]/1000);
      })
      .attr("cy", function (d) {
        return y(d["City Miles Per Gallon"]);
      })
      .attr("r", function (d) {
        if (d.Weight < 3367) {
          return 3;
        } else if (d.Weight > 4884) {
          return 9;
        } else {
          return 6;
        }
      })
      .style("fill", function (d) {
        return myColor(d.Type)
    })
      .attr("stroke", "black");
  });


};
