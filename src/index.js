import Test1 from "./components/test1";

const app = document.getElementById("app");
const Component1 = new Test1({
  target: app,
  selector: "component1"
});

Component1.mount();
