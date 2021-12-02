import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Missions from "./components/Missions";
import Profiles from "./components/Profiles";
import Rockets from "./components/Rockets";

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Rockets} />{" "}
      <Route path="/missions" component={Missions} />{" "}
      <Route path="/my-profile" component={Profiles} />{" "}
    </Switch>{" "}
  </Router>
);

export default App;
