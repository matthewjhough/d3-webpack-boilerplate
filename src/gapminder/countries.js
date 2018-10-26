import * as d3 from "d3";
import { canvas, xAxisGroup, yAxisGroup } from "./canvas";
import { x, y } from "./scales";
import { render } from "./render";

const t = d3.transition().duration(100);
d3.json("../data/countries.json").then(data => {
  const _all = data.map(({ year, countries }) => ({
    year,
    countries: countries.filter(
      ({ income, life_exp, population, country, continent }) =>
        income && life_exp && population && country && continent
    )
  }));

  let i = 0;
  d3.interval(() => {
    update(_all[i]);

    if (i === _all.length - 1) return (i = 0);
    i++;
  }, 300);

  update(_all[0]);
});

const update = ({ year, countries }) => {
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
  const circles = canvas.selectAll("circle").data(countries, c => c.country);

  render(circles, t, year);
};
