import * as ReactDOM from "react-dom/client";
import HomePage from "./components/HomePage";

const root = document.getElementById("root");

if (!!root) {
    ReactDOM.hydrateRoot(root, <HomePage />);
}
