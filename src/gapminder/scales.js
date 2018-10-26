import * as d3 from "d3";
import { height, width } from "./canvas";

/*
    Create scales visualization will adhere to.
    create X, Y scales (band, linear)
    set x values
*/

var x = d3.scaleLog().range([0, width]);

// set y values
var y = d3.scaleLinear().range([height, 0]);

var area = d3
  .scaleLinear()
  .range([25 * Math.PI, 1500 * Math.PI])
  .domain([2000, 1400000000]);

var continentColor = d3.scaleOrdinal(d3.schemePastel1);

export { x, y, area, continentColor };
