import * as d3 from "d3";

var margin = { left: 100, right: 10, top: 10, bottom: 100 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("../data/buildings.json").then(data => {
  data.forEach(item => (item.height = +item.height));

  var x = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([0, height]);

  var rects = g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.name))
    .attr("y", 50)
    .attr("width", x.bandwidth())
    .attr("height", d => y(d.height))
    .attr("fill", "gray");
});
