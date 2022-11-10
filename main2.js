var d3; // Minor workaround to avoid error messages in editors
window.onload = () => {
  // set the dimensions and margins of the graph
  var margin = {
      top: 20,
      right: 210,
      bottom: 50,
      left: 70,
    },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

  // create x,y and hover
  var x = d3.scaleLinear().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-height);

  var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width);

  var xCat = "Horsepower(HP)",
    yCat = "City Miles Per Gallon",
    rCat = "Engine Size (l)",
    colorCat = "Type";

  var labels = {
    Name: "Car name",
    Type: "Car type",
    AWD: "AWD",
    RWD: "RWD",
  };

  // Load the data set from the assets folder:
  d3.csv(
    "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091"
  ).then(function (data) {
    data.forEach(function (d) {
      d["Horsepower(HP)"] = +d["Horsepower(HP)"];
      d["City Miles Per Gallon"] = +d["City Miles Per Gallon"];
      d.Name = +d.Name;
      d.Type = +d.Type;
      d.AWD = +d.AWD;
      d.RWD = +d.RWD;
    });

    var xMax =
        d3.max(data, function (d) {
          return d[xCat];
        }) * 1.05,
      xMin = d3.min(data, function (d) {
        return d[xCat];
      }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax =
        d3.max(data, function (d) {
          return d[yCat];
        }) * 1.05,
      yMin = d3.min(data, function (d) {
        return d[yCat];
      }),
      yMin = yMin > 0 ? 0 : yMin;
    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    var color = d3.scale.category10();

    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function (d) {
        return (
          labels[xCat] +
          ": " +
          d[xCat] +
          "<br>" +
          labels[yCat] +
          ": " +
          d[yCat] +
          "<br>" +
          labels[rCat] +
          ": " +
          d[rCat]
        );
      });

    var zoomBeh = d3.behavior
      .zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 1000])
      .on("zoom", zoom);

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);
    svg.call(tip);
    svg.append("rect").attr("width", width).attr("height", height);
    svg
      .append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text("Horsepower(HP)");
    svg
      .append("g")
      .classed("y axis", true)
      .call(yAxis)
      .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", "1.5em")
      .style("text-anchor", "end")
      .text("City Miles Per Gallon");

    var objects = svg
      .append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);
    objects
      .append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");
    objects
      .append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);
    objects
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .classed("dot", true)
      .attr({
        r: function (d) {
          return 4 * Math.sqrt(d[rCat] / Math.PI);
        },
        cx: function (d) {
          return x(d[xCat]);
        },
        cy: function (d) {
          return y(d[yCat]);
        },
      })
      .style("fill", function (d) {
        return color(d[colorCat]);
      })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    var legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .classed("legend", true)
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });
    legend
      .append("rect")
      .attr("x", width + 10)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color);

    legend.on("click", function (type) {
      // dim all of the icons in legend
      d3.selectAll(".legend").style("opacity", 0.1);
      // make the one selected be un-dimmed
      d3.select(this).style("opacity", 1);
      // select all dots and apply 0 opacity (hide)
      d3.selectAll(".dot")
        // .transition()
        // .duration(500)
        .style("opacity", 0.0)
        // filter out the ones we want to show and apply properties
        .filter(function (d) {
          return d["first_careunit"] == type;
        })
        .style("opacity", 1) // need this line to unhide dots
        .style("stroke", "black")
        // apply stroke rule
        .style("fill", function (d) {
          if (d.hospital_expire_flag == 1) {
            return this;
          } else {
            return "white";
          }
        });
    });
    function zoom() {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);
      svg.selectAll(".dot").attr({
        cx: function (d) {
          return x(d[xCat]);
        },
        cy: function (d) {
          return y(d[yCat]);
        },
      });
    }
  });
};
