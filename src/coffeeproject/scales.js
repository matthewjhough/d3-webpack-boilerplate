import * as d3 from "d3";
import { height, width } from "./canvas";

/*
    Create scales visualization will adhere to.
    create X, Y scales (band, linear)
    set x values
*/

var x = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3);

// set y values
var y = d3.scaleLinear().range([height, 0]);

export { x, y };
