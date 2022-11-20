var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 60, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  var x = d3.scaleLinear().domain([0, 4000]).range([0, width]);
  var y = d3.scaleLinear().domain([0, 70]).range([height, 0]);
  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  let color = ["darkorange"]; // Color of the filled area

// The 6 attributes to be visualized
let features = [
  "Retail Price",
  "City Miles per Gallon",
  "Weight",
  "Engine Size",
  "Number of Cylinders",
  "Length",
];

  //Read the data
  d3.csv(
    "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091"
  ).then(function (data) {
    data.forEach(function (d) {
    d["Retail Price"] = +d["Retail Price"];
    d["City Miles per Gallon"] = +d["City Miles Per Gallon"];
    d["Weight"] = +d["Weight"];
    d["Engine Size"] = +d["Engine Size (l)"];
    d["Number of Cylinders"] = +d["Cyl"];
    d["Length"] = +d["Len"];
  });
    //Find max value of each attribute
  var maxValues = {};
  features.forEach(
    (f) =>
      (maxValues[f] = d3.max(data, function (d) {
        return d[f];
      }))
  );
    console.log(maxValues);

    // Add X axis
    svg
      .append("g")
      .attr("class", "myXaxis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "14px")
      .call(d3.axisBottom(x));

    // Text label for the x axis
    // Source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Retail Price [1000 $]");

    // Add Y axis
    svg.append("g").style("font-size", "14px").call(d3.axisLeft(y));

    // Text label for the y axis
    // Source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text("City Miles Per Gallon [MPG]");

    // Add a scale for bubble color
    var keys = ["Sedan", "SUV", "Sports Car", "Wagon", "Minivan"];
    var myColor = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);

    var tooltip = d3
      .select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")

      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    var mouseover = function (d) {
      tooltip.style("opacity", 1);
    };
    var mousemove = function (d) {
      let word = d.Type;
      tooltip
        .html(
          
        )

        .style("left", d3.mouse(this)[0] + "px")
        .style("top", d3.mouse(this)[1] + "px")
        .style("background-color", function (d) {
          return myColor(word);
        });
    };
    var mouseleave = function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", function (d) {
        return "dot " + d.Type;
      })
      .attr("cx", function (d) {
        return x(d["Retail Price"] / 1000);
      })
      .attr("cy", function (d) {
        return y(d["City Miles Per Gallon"]);
      })
      .attr("r", function (d) {
        if (d.Weight < 3367) {
          return 4;
        } else if (d.Weight > 4884) {
          return 10;
        } else {
          return 7;
        }
      })
      .style("fill", function (d) {
        return myColor(d.Type);
      })
      .attr("stroke", "black")
      .on("click", function () {
        d3.selectAll(".dot")
          .transition()
          .duration(200)
          .attr("r", 2)
          .style("fill", "lightgray");

        d3.select(this)
          .transition()
          .duration("100")
          .attr("r", function (d) {
            if (d.Weight < 3367) {
              return 4;
            } else if (d.Weight > 4884) {
              return 10;
            } else {
              return 7;
            }
          });

        mouseover();
      })
      .on("mouseout", function (d, i) {
        d3.selectAll(".dot")
          .transition()
          .duration("200")
          .attr("r", function (d) {
            if (d.Weight < 3367) {
              return 4;
            } else if (d.Weight > 4884) {
              return 10;
            } else {
              return 7;
            }
          })
          .style("fill", function (d) {
            return myColor(d.Type);
          });
      })
      .on("mousemove", mousemove);
    x.domain([0, 200]);
    svg
      .select(".myXaxis")
      .transition()
      .duration(2000)
      .attr("opacity", "1")
      .call(d3.axisBottom(x));

    svg
      .selectAll("circle")
      .transition()
      .delay(function (d, i) {
        return i * 3;
      })
      .duration(2000)
      .attr("cx", function (d) {
        return x(d["Retail Price"] / 1000);
      })
      .attr("cy", function (d) {
        return y(d["City Miles Per Gallon"]);
      });

    // Legend https://d3-graph-gallery.com/graph/custom_legend.html

    // Add one dot in the legend for each name.
    svg
      .selectAll("mydots")
      .data(keys)
      .enter()
      .append("circle")
      .attr("cx", 800)
      .attr("cy", function (d, i) {
        return 10 + i * 25;
      })
      .attr("r", 7)
      .style("fill", function (d) {
        return myColor(d);
      })
      .attr("stroke", "black");
    // Add label name for dot in the legend for each name.
    svg
      .selectAll("mylabels")
      .data(keys)
      .enter()
      .append("text")
      .attr("x", 820)
      .attr("y", function (d, i) {
        return 10 + i * 25;
      })
      .style("fill", function (d) {
        return myColor(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
    // Add size legend

    var weight = ["light", "medium", "heavy"];
    var size = [3, 6, 9];

    // Add one dot in the legend for each name.
    svg
      .selectAll("legend")
      .data(weight)
      .enter()
      .append("circle")
      .attr("cx", 720)
      .attr("cy", function (d, i) {
        return 10 + i * 25;
      })
      .attr("r", function (d) {
        if (d == "light") {
          return 4;
        } else if (d == "heavy") {
          return 10;
        } else {
          return 7;
        }
      })
      .style("fill", "none")
      .attr("stroke", "black");
    // Add label name for dot in the legend for each name.
    svg
      .selectAll("mylabels")
      .data(weight)
      .enter()
      .append("text")
      .attr("x", 740)
      .attr("y", function (d, i) {
        return 10 + i * 25;
      })
      .style("fill", "black")
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  });
};
