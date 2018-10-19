import AppDrawer from "./components/AppDrawer";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const app = document.getElementById("app");
window.customElements.define("app-drawer", AppDrawer);
