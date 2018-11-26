import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import Appp from "./Appp";

import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";

render(
  <BrowserRouter>
    <Switch>
      <Route path="/cn" component={App} />
      <Route path="/en" component={Appp} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
