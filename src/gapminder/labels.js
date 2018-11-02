import * as d3 from "d3";
import { height, width, canvas } from "./canvas";
import { continentColor } from "./scales";
/*
    Update dom to show labels, key of graph
*/
// Labels
var xLabel = canvas
  .append("text")
  .attr("y", height + 50)
  .attr("x", width / 2)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("GDP Per Capita ($)");
var yLabel = canvas
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -40)
  .attr("x", -170)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Life Expectancy (Years)");
var timeLabel = canvas
  .append("text")
  .attr("y", height - 10)
  .attr("x", width - 40)
  .attr("font-size", "40px")
  .attr("opacity", "0.4")
  .attr("text-anchor", "middle")
  .text("1800");

export { xLabel, yLabel, timeLabel };
