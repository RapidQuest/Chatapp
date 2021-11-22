import React from "react";

import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/privateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Homepage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/chat" exact component={Chat} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
