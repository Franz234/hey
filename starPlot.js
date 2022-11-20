//INCOMPLETE
// Modified from following guide: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
var d3; // Minor workaround to avoid error messages in editors

var d3; // Minor workaround to avoid error messages in editors



let width = 800;
let height = 600;
let selected = 4; // The current selected datapoint
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

// read data from the csv file and convert to numbers
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

  //object containing values and names of the 6 attributes
  var point = {};
  features.forEach((f) => (point[f] = data[selected][f]));
  console.log(point);

  //Normalize variable 'point' using variable 'maxValues'
  features.forEach(
    (f) =>
      (point[f] = point[f]*10/maxValues[f])
  );

  // Adding svg
  let svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Plotting the gridlines
  let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 150]);
  let ticks = [2, 4, 6, 8, 10];

  ticks.forEach((t) =>
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", radialScale(t))
  );

  //Helper function to map angle to coordinates
  function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { x: width / 2 + x, y: height / 2 - y };
  }

  var anchors = ["middle","end","end","middle","start","start"];
  for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
    let line_coordinate = angleToCoordinate(angle, 10);
    let label_coordinate = angleToCoordinate(angle, 11);

    //draw axis line
    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke", "black");

    //draw axis label
    svg
      .append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .style("font-size", "16px")
      .attr("text-anchor", anchors[i])
      .text(ft_name);
  }

  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  }

  let coordinates = getPathCoordinates(point);

  //draw the path element
  svg
    .append("path")
    .datum(coordinates)
    .attr("d", line)
    .attr("stroke-width", 3)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("stroke-opacity", 1)
    .attr("opacity", 0.5);
});
