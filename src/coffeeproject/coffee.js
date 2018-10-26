import * as d3 from "d3";

const margin = {
  left: 100,
  right: 10,
  top: 10,
  bottom: 150
};
const height = 400 - margin.top - margin.bottom;
const width = 600 - margin.left - margin.right;

// canvas setup :

const canvas = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label
canvas
  .append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month");

// Y Label
canvas
  .append("text")
  .attr("class", "y axis-label")
  .attr("x", -(height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue");

// get / handle JSON data :
d3.json("../data/revenue.json").then(data => {
  const revenue = data.map(({ month, revenue, profit }) => ({
    month,
    revenue: +revenue,
    profit: +profit
  }));

  // create X, Y scales (band, linear)
  // set x values
  var x = d3
    .scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // set y values
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([height, 0]);

  var xAxisCall = d3.axisBottom(x);
  canvas
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text") // select all labels, apply attributes
    .attr("y", "15")
    .attr("text-anchor", "middle");
  // .attr("transform", "rotate(-40)");

  var yAxisCall = d3
    .axisLeft(y)
    .ticks(revenue.length * 2)
    .tickFormat(d => `$${d}`);
  canvas
    .append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  const rects = canvas
    .selectAll("rect")
    .data(revenue)
    .enter()
    .append("rect")
    .attr("x", d => x(d.month))
    .attr("y", d => y(d.revenue))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.revenue))
    .attr("fill", "gray");
});
