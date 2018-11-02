import * as d3 from "d3";
import d3Tip from "d3-tip";
d3.tip = d3Tip;
/*
    Create Canvas details, height, width, sizes
*/

const margin = {
  left: 100,
  right: 10,
  top: 10,
  bottom: 150
};
const height = 600 - margin.top - margin.bottom;
const width = 800 - margin.left - margin.right;

// ******************************** canvas setup :

const canvas = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// ******************************** create x y axis groups to prevent constantly appending new axis :
const xAxisGroup = canvas
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")");

const yAxisGroup = canvas.append("g").attr("class", "y-axis");

// ******************************** Tooltips : setup html, and call method for tips.
const tip = d3
  .tip()
  .attr("class", "d3-tip")
  .html(
    d => `
    <div class="tooltip-wrapper">
      <div><span class="bold-tltp">Country:</span> <span class="tltp-content">${
        d.country
      }</span></div>
      <div><span class="bold-tltp">Continent:</span> <span class="tltp-content">${
        d.continent
      }</span></div>
      <div><span class="bold-tltp">Life Expectency:</span> <span class="tltp-content">${d3.format(
        ".2f"
      )(d.life_exp)}</span></div>
      <div><span class="bold-tltp">Income:</span> <span class="tltp-content">${d3.format(
        "$,.0f"
      )(d.income)}</span></div>
      <div><span class="bold-tltp">Population:</span> <span class="tltp-content">${d3.format(
        ",.0f"
      )(d.population)}</span></div>
    </div>
  `
  );

canvas.call(tip);

export { margin, height, width, canvas, xAxisGroup, yAxisGroup, tip };
