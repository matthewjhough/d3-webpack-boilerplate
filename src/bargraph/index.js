import * as d3 from "d3";

// d3.json("./ages.json").then(data => console.log(data));
d3.json("../data/ages.json")
  .then(data => {
    data.forEach(value => {
      value.age = +value.age;
    });
    console.log(data);

    var svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);

    var circles = svg.selectAll("circle").data(data);

    circles
      .enter()
      .append("circle")
      .attr("cx", (d, i) => {
        console.log(d);
        return i * 50 + 25;
      })
      .attr("cy", 200)
      .attr("r", d => {
        return d.age * 2;
      })
      .attr("fill", d => {
        if (d.name === "Tony") {
          return "Green";
        }

        return "Blue";
      });
  })
  .catch(err => {
    console.log(err);
  });
