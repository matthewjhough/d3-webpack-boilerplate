import * as d3 from "d3";

/*
    Create Canvas details, height, width, sizes
*/

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

// create x y axis groups to prevent constantly appending new axis :
const xAxisGroup = canvas
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")");

const yAxisGroup = canvas.append("g").attr("class", "y-axis");

export { margin, height, width, canvas, xAxisGroup, yAxisGroup };
