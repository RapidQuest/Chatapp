import React from "react";

import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/Homepage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <PrivateRoute path="/homepage" exact component={HomePage} />
          {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Login} />
          {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
