import * as d3 from "d3";
import { canvas, xAxisGroup, yAxisGroup, width, height } from "./canvas";
import { x, y, continentColor } from "./scales";
import { render } from "./render";
import { getVals } from "../utils/slider";
import "./style.css";

var interval;
var time = 0;
var _all;

/*
  *******************
  GET DATA
  *******************
*/

d3.json("../data/countries.json").then(data => {
  _all = data.map(({ year, countries }) => ({
    year,
    countries: countries.filter(
      ({ income, life_exp, population, country, continent }) =>
        income && life_exp && population && country && continent
    )
  }));

  update(_all[0]);
});

/*
  *******************
  STEP FUNCTION
  *******************
*/

const step = () => {
  if (time === _all.length - 1) return (time = 0);
  time++;
  update(_all[time]);
};

/*
  *******************
  UPDATE method
  *******************
*/
const update = ({ year, countries }) => {
  const t = d3.transition().duration(100);

  var selected = continent.value;
  var filtered = countries.filter(d => {
    if (selected === "all") return true;
    else {
      return d.continent === selected;
    }
  });

  // set domain on update
  x.domain([300, 150000]);
  y.domain([0, 90]);

  // call x axis / transitions
  var xAxisCall = d3
    .axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(f => `$${f}`);
  xAxisGroup.transition(t).call(xAxisCall);

  // call y axis / transitions
  var yAxisCall = d3.axisLeft(y).tickFormat(d => `${d}`);
  yAxisGroup.transition(t).call(yAxisCall);

  /* D3 Update pattern */
  // JOIN new data with old elements.
  const circles = canvas.selectAll("circle").data(filtered, c => c.country);

  render(circles, t, year, sliderYear, slider, time);
};

/*
  *******************
  KEY Setup
  *******************
*/
const continents = ["europe", "asia", "americas", "africa"];
const legend = canvas
  .append("g")
  .attr("transform", "translate(" + (width - 10) + ", " + (height - 125) + ")");

continents.forEach((continent, i) => {
  var legendRow = legend
    .append("g")
    .attr("transform", "translate(0, " + i * 20 + ")");

  legendRow
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", continentColor(continent));

  legendRow
    .append("text")
    .attr("x", -10)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .style("text-transform", "capitalize")
    .text(continent);
});

/*
  *******************
  DOM EVENT listeners
  *******************
*/
const continent = document.getElementById("continent-select");
const playpause = document.getElementById("play-button");
const reset = document.getElementById("reset-button");
const pause = "Pause";
const play = "Play";

playpause.addEventListener("click", () => {
  if (playpause.innerText === pause) {
    playpause.innerText = play;
    interval = clearInterval(interval);
  } else {
    playpause.innerText = pause;
    interval = setInterval(step, 100);
  }
});

reset.addEventListener("click", () => {
  time = 0;
  update(_all[0]);
});

continent.addEventListener("change", () => {
  update(_all[time]);
});

var slider = document.getElementById("single-slider");
var sliderYear = document.getElementById("year");
sliderYear.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sliderYear.innerHTML = this.value;
  time = this.value - 1800;
  update(_all[time]);
};
