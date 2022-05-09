import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RootStore from "./stores/RootStore";
import { RootStoreProvider } from "./provider/RootStoreProvider";

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider RootStore={rootStore}>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
