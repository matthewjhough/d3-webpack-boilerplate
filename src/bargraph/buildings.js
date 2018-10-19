import * as d3 from "d3";

var margin = { left: 100, right: 10, top: 10, bottom: 150 };

var width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// create canvas for visualization
var g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Labels ...
// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The word's tallest buildings");

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)");

// Viz start
d3.json("../data/buildings.json").then(data => {
  // convert all height strings to int
  data.forEach(item => (item.height = +item.height));

  // set x values
  var x = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // set y values
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([0, height]);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text") // select all labels, and transform to make them readable
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  var yAxisCall = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + "m");
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  // build and color rectangles
  var rects = g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.name))
    .attr("y", 0)
    .attr("width", x.bandwidth())
    .attr("height", d => y(d.height))
    .attr("fill", "gray");
});
