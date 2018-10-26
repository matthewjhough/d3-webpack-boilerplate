import * as d3 from "d3";
import { height, width, canvas, xAxisGroup, yAxisGroup } from "./canvas";
import { x, y } from "./scales";
import { yLabel, xLabel } from "./labels";
import "./style.css";

// flag to switch between data view
var flag = true;

// transition variable
const t = d3.transition().duration(500);

/*
  Core of visualization, gets data, defines & runs updating script.
*/

// get / handle JSON data :
d3.json("../data/revenue.json").then(data => {
  const revenue = data.map(({ month, revenue, profit }) => ({
    month,
    revenue: +revenue,
    profit: +profit
  }));

  d3.interval(() => {
    const modified = flag ? data : data.slice(1);
    update(modified);
    flag = !flag;
  }, 1000);
  update(revenue);
});

/* **** D3 Update visualization **** */
const update = revenue => {
  const value = flag ? "revenue" : "profit";
  // console.log("updating...");
  x.domain(revenue.map(d => d.month));
  y.domain([0, d3.max(revenue, d => d[value])]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);

  var yAxisCall = d3.axisLeft(y).tickFormat(d => `$${d}`);
  yAxisGroup.transition(t).call(yAxisCall);

  /*
    D3 Update pattern
  */

  // JOIN new data with old elements.
  const rects = canvas.selectAll("circle").data(revenue, ({ month }) => month);

  // EXIT old elements not present in new data.
  rects
    .exit()
    .attr("fill", "red")
    .transition(t)
    .attr("cy", y(0))
    .attr("height", 0)
    .remove();

  // ENTER new elements present in new data.
  rects
    .enter()
    .append("circle")
    .attr("fill", "grey")
    .attr("cy", y(0))
    .attr("cx", d => x(d.month) + x.bandwidth() / 2)
    .attr("r", 5)
    // AND UPDATE old elements present in new data
    .merge(rects)
    .transition(t)
    .attr("cx", d => x(d.month) + x.bandwidth() / 2)
    .attr("cy", d => y(d[value]))
    .attr("r", 5);

  const label = flag ? "Revenue" : "Profit";
  yLabel.text(label);
};
