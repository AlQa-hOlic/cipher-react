import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "./App";
import Appp from "./Appp";

import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";

render(
  <HashRouter>
    <Switch>
      <Route path="/cn" component={App} />
      <Route path="/en" component={Appp} />
      <Redirect path="/" to="/en" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
