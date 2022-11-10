var d3; // Minor workaround to avoid error messages in editors
window.onload = () => {
  // set the dimensions and margins of the graph
};

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
var x = d3.scaleLiner().range([0, width]).nice();

var y = d3.scaleLiner().range([height, 0]).nice();

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
  "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091",
  function (data) {
    data.forEach(function (d) {
      d["Horsepower(HP)"] = +d["Horsepower(HP)"];
      d["City Miles Per Gallon"] = +d["City Miles Per Gallon"];
      d.Name = +d.Name;
      d.Type = +d.Type;
      d.AWD = +d.AWD;
      d.RWD = +d.RWD;
    });
    
    var xMax = d3.max(data, function(d) {
      return d[xCat];
    }) * 1.05,
        xMin = d3.min(data, function(d) {
          return d[xCat];
        }),
        xMin = xMin > 0 ? 0 : xMin,
        yMax = d3.max(data, function(d) {
          return d[yCat];
        }) * 1.05,
        yMin = d3.min(data, function(d) {
          return d[yCat];
        }),
        yMin = yMin > 0 ? 0 : yMin;
    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);
    
    var color = d3.scale.category10();
    
    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return labels[xCat] + ": " + d[xCat] + "<br>" + labels[yCat] + ": " + d[yCat] + "<br>" + labels[rCat] + ": " + d[rCat];
        });
    
    var zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 1000])
  }
);
