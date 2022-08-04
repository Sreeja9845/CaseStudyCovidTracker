import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import Disease from "./components/disease";
import Hospital from "./components/hospital";
const App = () => {
  return (
    <Router>
      <div className="main-container">
        <Route path={["/home", "/"]} exact  render={(props) => <Home {...props}/>}/>
        <Route path="/disease" exact  render={(props) => <Disease {...props}/>} />
        <Route path="/hospital" exact  render={(props) => <Hospital {...props} />}/>
      </div>
    </Router>
  );
};

export default App;
