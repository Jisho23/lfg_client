import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./components/Nav.js";
import Gamelist from "./components/Gamelist.js";
import Login from "./components/Login.js";
import Myprofile from "./components/Myprofile.js";
import {} from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      authorization: {
        isloggedIn: false
      },
      error: "",
      user: {}
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  resetError() {
    this.setState({ error: "" });
  }

  componentDidMount = () => {
    this.fetchGames();
    if (localStorage.getItem("jwt")) {
      this.findCurrentUser();
    }
  };

  fetchGames = () => {
    fetch("http://localhost:3001/api/v1/games")
      .then(res => res.json())
      .then(json => {
        this.setState({ games: json });
      });
  };

  login = form => {
    this.resetError();
    fetch(`http://localhost:3001/api/v1/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.setState({
            authorization: { isLoggedIn: true }
          });
          localStorage.setItem("jwt", json.jwt);
          this.findCurrentUser();
        } else {
          this.setState({ error: json.error });
        }
      });
  };

  findCurrentUser = () => {
    return fetch(`http://localhost:3001/api/v1/current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: this.parseJwt(localStorage.getItem("jwt")).user_id
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ authorization: { isLoggedIn: true }, user: json });
        this.props.history.push("/myprofile");
      });
  };

  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  updateUser(attribute, value) {
    const newState = { ...this.state.user };
    newState.user[attribute] = value;
    this.setState({ newState });
    fetch(`http://localhost:3001/api/v1/users/${this.state.user.user.id}`, {
      method: "PATCH",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(newState)
    });
  }

  addRemoveGame(performAction, gameId) {
    const toDo = {
      performAction: performAction,
      gameId: gameId,
      userId: this.state.user.user.id
    };
    fetch("http://localhost:3001/api/v1/addRemoveGame", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(toDo)
    });
    const state = this.state;
    if (performAction === "add") {
      state.user.games.push(gameId);
    } else {
      state.user.games = state.user.games.filter(game => game !== gameId);
    }
    this.setState({ state });
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({ authorization: { isLoggedIn: false } });
    this.props.history.push(`/login`);
  }

  render() {
    return (
      <div>
        <Navbar
          handleLogout={this.handleLogout}
          isLoggedIn={this.state.authorization.isLoggedIn}
        />
        {!!this.state.error ? (
          <div className="ui error message"> {this.state.error} </div>
        ) : null}
        <Route exact path="/" render={() => <div>Test</div>} />
        <Route
          exact
          path="/games"
          render={() => (
            <div>
              <Gamelist
                games={this.state.games}
                appState={this.state}
                addRemoveGame={this.addRemoveGame.bind(this)}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <Login handleOnSubmit={this.login} appState={this.state} />
          )}
        />
        <Route
          exact
          path="/myprofile"
          render={() => (
            <Myprofile
              user={this.state.user}
              updateUser={this.updateUser.bind(this)}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
