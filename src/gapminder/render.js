import { timeLabel } from "./labels";
import { x, y, area, continentColor } from "./scales";
import { tip } from "./canvas";

export function render(circles, t, year, sliderYear, slider, time) {
  // EXIT old elements not present in new data.
  circles
    .exit()
    .attr("class", "exit")
    .remove();

  // ENTER new elements present in new data.
  circles
    .enter()
    .append("circle")
    .attr("fill", d => continentColor(d.continent))
    // Attach events before merge, only want to attach event listeners once
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    // AND UPDATE old elements present in new data
    .merge(circles)
    .transition(t)
    .attr("cy", d => y(d.life_exp))
    .attr("cx", d => x(d.income))
    .attr("r", d => Math.sqrt(area(d.population) / Math.PI));

  timeLabel.text(+(time + 1800));
  sliderYear.innerText = time + 1800;
  slider.value = time + 1800;
}
