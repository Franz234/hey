var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");

  // Load the data set from the assets folder:
  d3.csv("https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091").then(function (data) {
    console.log(data.AWD)
    //Variables
    var body = d3.select('body')
    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    var h = 500 - margin.top - margin.bottom
    var w = 500 - margin.left - margin.right
    var formatPercent = d3.format('.2%')
    //Scales
    var colorScale = d3.scale.category20()
    var xScale = d3.scale.linear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.AWD })]),
          d3.max([0,d3.max(data,function (d) { return d.AWD })])
          ])
      .range([0,w])
    var yScale = d3.scale.linear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.RWD })]),
          d3.max([0,d3.max(data,function (d) { return d.RWD })])
          ])
      .range([h,0])
    //SVG
    var svg = body.append('svg')
          .attr('height',h + margin.top + margin.bottom)
          .attr('width',w + margin.left + margin.right)
        .append('g')
          .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
    //X-axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(formatPercent)
        .ticks(5)
        .orient('bottom')
    //Y-axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(formatPercent)
        .ticks(5)
        .orient('left')
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x',w)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Standard Deviation')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Return')
  });
};
