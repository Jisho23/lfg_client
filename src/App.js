import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./components/Nav.js";
import {} from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      authorization: {
        isloggedIn: false,
        user: {}
      },
      error: ""
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" render={() => <div>Test</div>} />
        <Route exact path="/games" render={() => <div>Test games</div>} />
        <Route exact path="/login" render={() => <div>Login</div>} />
      </div>
    );
  }
}

export default withRouter(App);
