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

    //Read the data
    d3.csv(
        "https://cdn.glitch.com/3406f498-ccaa-4592-93d3-c0a3a2e58c43%2Fcars.csv?v=1604907277091"
    ).then(function (data) {

        // Add X axis
        svg.append("g")
            .attr("class", "myXaxis")
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

        var tooltip =d3.select("body")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color","white")

            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")


        var mouseover = function(d) {
            tooltip
                .style("opacity", 1)
        }
        var mousemove = function(d) {
            let word = d.Type;
            tooltip
                .html(" The exact value of the type of auto  is: " + d.Type.toString() +
                    "<br> Its Retail price is: " + (d["Retail Price"]/1000).toString()+
                    " <br> Its Dealer Cost is: " + (d["Dealer Cost"]/1000).toString()+
                    " <br> Its Weigth is: " + (d.Weight).toString()+
                    " <br> Its Len is: " + (d.Len).toString()+
                    " <br> Its Cyl is: " + (d.Cyl).toString())

                .style("left", (d3.mouse(this)[0]) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
                .style("background-color", function (d)
                {
                    return myColor(word)
                })

        }
        var mouseleave = function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }


        // Add dots
        svg
            .append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Type } )
            .attr("cx", function (d) {
                return x(d["Retail Price"]/1000);
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
            }).style("fill",function (d) {
            return myColor(d.Type);})
            .attr("stroke", "black")
            .on("click", function () {
                d3.selectAll(".dot").transition().duration(200).attr("r",2).style("fill","lightgray" )

                d3.select(this).transition()
                    .duration('100')
                    .attr("r", function (d) {
                        if (d.Weight < 3367) {
                            return 4;
                        } else if (d.Weight > 4884) {
                            return 10;
                        } else {
                            return 7;
                        }
                    })

                mouseover()


            })
            .on('mouseout', function (d, i) {
                d3.selectAll(".dot").transition()
                    .duration('200')
                    .attr("r",function (d)
                    {
                        if (d.Weight < 3367) {
                            return 4;
                        } else if (d.Weight > 4884) {
                            return 10;
                        } else {
                            return 7;
                        }
                    })
                    .style("fill",function (d) {
                    return myColor(d.Type);})

            })
           .on("mousemove",mousemove)
        x.domain([0, 200])
        svg.select(".myXaxis")
            .transition()
            .duration(2000)
            .attr("opacity", "1")
            .call(d3.axisBottom(x));

        svg.selectAll("circle")
            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("cx", function (d) {  return x(d["Retail Price"]/1000); } )
            .attr("cy", function (d) {return y(d["City Miles Per Gallon"]); } )


    });


};