import * as d3 from "d3";
import { height, width, canvas } from "./canvas";

/*
    Update dom to show labels
*/
// X Label
var xLabel = canvas
  .append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month");

// Y Label
var yLabel = canvas
  .append("text")
  .attr("class", "y axis-label")
  .attr("x", -(height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue");

export { xLabel, yLabel };
