import React from "react";
import ReactDOM from "react-dom/client";
import CyclopediaClass from "./Components/CycloPages/CyclopediaClass";
import Header from "./Components/layout/Header";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header />
    <div className="row text-white">
      <div className="col-6">
        <span className="h1 text-warning text-center">Class component</span>
        <CyclopediaClass />
      </div>
    </div>
  </div>
);
