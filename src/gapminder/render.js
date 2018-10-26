import { timeLabel } from "./labels";
import { x, y, area, continentColor } from "./scales";

export function render(circles, t, year) {
  // EXIT old elements not present in new data.
  circles
    .exit()
    .attr("fill", "red")
    .transition(t)
    .attr("cy", y(0))
    .attr("height", 0)
    .remove();

  // ENTER new elements present in new data.
  circles
    .enter()
    .append("circle")
    .attr("fill", d => continentColor(d.continent))
    // AND UPDATE old elements present in new data
    .merge(circles)
    .transition(t)
    .attr("cy", d => y(d.life_exp))
    .attr("cx", d => x(d.income))
    .attr("r", d => Math.sqrt(area(d.population) / Math.PI));

  timeLabel.text(+year);
}
