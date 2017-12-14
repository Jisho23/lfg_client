import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./components/Nav.js";
import Gamelist from "./components/Gamelist.js";
import Login from "./components/Login.js";
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

  componentDidMount = () => {
    this.fetchGames();
  };

  fetchGames = () => {
    fetch("http://localhost:3001/api/v1/games")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ games: json });
      });
  };

  login = e => {
    debugger;
  };

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" render={() => <div>Test</div>} />
        <Route
          exact
          path="/games"
          render={() => (
            <div>
              <Gamelist games={this.state.games} />
            </div>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <Login handleOnSubmit={this.login} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
