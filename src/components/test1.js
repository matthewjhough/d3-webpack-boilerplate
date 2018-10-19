import Component from "../lib/Component";
import * as d3 from "d3";

export default class Test1 extends Component {
  constructor(params = {}) {
    super(params);
    this.target = params.target;
    this.state = {};
  }

  listener(selector) {
    document.getElementById(selector).addEventListener("click", e => {
      console.log("clicked component", e);
    });
  }

  mounted() {
    d3.selectAll("p").style("color", "green");
  }

  render(selector) {
    return `
    <div id="${selector}" class="${selector}">
        <p>Hello, From Test1</p>
    </div>
    `;
  }
}
