export default class Component {
  constructor(params = {}) {
    this.listener = this.listener || function() {};
    this.render = this.render || function() {};
    this.mounted = this.mounted || function() {};
    this.state = this.state || {};
    this.selector = params.selector || "undefined selector";
    this.target = params.target || document.createElement("div");
  }

  getElement() {
    return this.render(this.selector);
  }

  getListener() {
    return this.listener(this.selector);
  }

  mount() {
    console.log(this);
    const element = this.getElement();
    if (!this.target) {
      console.warn("No target dom element set in", this.selector || this.state);
      return;
    }
    this.target.innerHTML = element;
    this.getListener();
    this.mounted();
  }
}
