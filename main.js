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
    var x = d3.scaleLinear().domain([0, 500]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 70]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Color scale: give me a car type, I return a color
    var car = d3
      .scaleOrdinal()
      .domain(["Minivan", "Sedan", "Sports Car", "SUV", "Wagon"])
      .range(["red", "blue", "green", "black", "yellow"]);

    // Highlight the dot that is hovered
    var highlight = function (d) {
      d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
    };

    // Highlight the dot that is hovered
    var doNotHighlight = function () {
      d3.select(this).attr('stroke', null);
    };

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", function (d) {
        return "dot" + d["Type"];
      })
      .attr("cx", function (d) {
        return x(d["Horsepower(HP)"]);
      })
      .attr("cy", function (d) {
        return y(d["City Miles Per Gallon"]);
      })
      .attr("r", 5)
      .style("fill", function (d) {
        return car(d["Type"]);
      })
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight);

    //Legend
    function colorLegend(container) {
      const titlePadding = 14;
      const entrySpacing = 16;
      const entryRadius = 5;
      const labelOffset = 4;
      const baselineOffset = 4;
      
      const title = container.append('text')
      .attr('x',0)
      .attr()
    }
    
    
//     var legend = svg
//       .selectAll(".legend")
//       .data(car.domain())
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", function (d, i) {
//         return "translate(0," + i * 20 + ")";
//       });

//     legend
//       .append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);

//     legend
//       .append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function (d) {
//         return d;
//       });
  });
};
