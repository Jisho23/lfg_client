import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import CreateUser from "./components/CreateUser.js";
import Navbar from "./components/Nav.js";
import Gamelist from "./components/Gamelist.js";
import Login from "./components/Login.js";
import Myprofile from "./components/Myprofile.js";
import CreateGroup from "./components/Creategroup.js";
import Groupview from "./components/Groupview.js";
import * as Api from "./Api/Index.js";

import {} from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      authorization: {
        isloggedIn: false
      },
      error: "",
      success: "",
      user: {},
      group: {},
      nav: ""
    };
  }

  resetError() {
    this.setState({ error: "" });
    this.setState({ success: "" });
  }

  setNav = value => {
    this.setState({ nav: value });
  };

  componentDidMount = () => {
    this.fetchGames();
    if (localStorage.getItem("jwt")) {
      this.findCurrentUser();
    }
  };

  fetchGames = () => {
    Api.fetchGames()
      .then(res => res.json())
      .then(json => {
        this.setState({ games: json });
      });
  };

  login = form => {
    this.resetError();
    Api.login(form)
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.setState({
            authorization: { isLoggedIn: true }
          });
          localStorage.setItem("jwt", json.jwt);
          this.findCurrentUser();
          this.props.history.push("/myprofile");
        } else {
          this.setState({ error: json.error });
        }
      });
  };

  findCurrentUser = () => {
    Api.findCurrentUser()
      .then(res => res.json())
      .then(json => {
        this.setState({ authorization: { isLoggedIn: true }, user: json });
      });
  };

  updateUser = (attribute, value) => {
    const newState = { ...this.state.user };
    newState.user[attribute] = value;
    this.setState({ newState });
    Api.updateUser(this.state.user.user.id, newState);
  };

  addRemoveGame = toDo => {
    Api.fetchaddRemoveGame(toDo);
    const newState = this.state;
    if (toDo.performAction === "add") {
      newState.user.games.push(toDo.gameId);
    } else {
      newState.user.games = newState.user.games.filter(
        game => game !== toDo.gameId
      );
    }
    this.setState({ newState });
  };

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({ authorization: { isLoggedIn: false } });
    this.props.history.push(`/login`);
  };

  handleCreateGroup = form => {
    Api.handleCreateGroup(form)
      .then(res => res.json())
      .then(json => this.setState({ group: json }))
      .then(() => this.findCurrentUser())
      .then(() => this.props.history.push("/group"));
  };

  handleFindGroup = groupId => {
    Api.handleFindGroup(groupId)
      .then(res => res.json())
      .then(json => this.setState({ group: json }))
      .then(() => this.props.history.push("/group"));
  };

  handleAcceptRejectInvite = (action, invite_id) => {
    const body = { toDo: action, inviteId: invite_id };
    Api.handleAcceptRejectInvite(body)
      .then(res => res.json())
      .then(json => {
        debugger;
        if (action === "Leave Party?") {
          this.props.history.push("/myprofile");
        } else if (json.invite_status === "Invite Accepted!") {
          this.handleFindGroup(json.group_id);
        }
        this.findCurrentUser();
      });
  };

  handleDisbanGroup = groupId => {
    Api.handleDisbanGroup(groupId).then(() => {
      this.findCurrentUser();
      this.props.history.push("/myprofile");
    });
  };

  createUser = form => {
    Api.createUser(form)
      .then(res => res.json())
      .then(json => {
        this.props.history.push("/login");
        this.setState({ success: "You have successfully created a new user!" });
      });
  };

  handleHonor = honorInfo => {
    Api.handleHonor(honorInfo)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.findCurrentUser();
      });
  };

  addToParty = form => {
    debugger;
    Api.addNewPlayer(form).then(() => this.handleFindGroup(form.groupId));
  };

  render() {
    return (
      <div>
        <Navbar
          handleLogout={this.handleLogout}
          isLoggedIn={this.state.authorization.isLoggedIn}
          nav={this.state.nav}
        />
        {!!this.state.error ? (
          <div className="ui error message"> {this.state.error} </div>
        ) : null}
        {!!this.state.success ? (
          <div className="ui success message"> {this.state.success} </div>
        ) : null}
        <Route exact path="/" render={() => <div>Test</div>} />
        <Route
          path="/games"
          render={() => (
            <div>
              <Gamelist
                games={this.state.games}
                appState={this.state}
                addRemoveGame={this.addRemoveGame}
                setNav={this.setNav}
              />
            </div>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Login
              setNav={this.setNav}
              handleOnSubmit={this.login}
              appState={this.state}
            />
          )}
        />
        <Route
          path="/myprofile"
          render={() => (
            <Myprofile
              user={this.state.user}
              updateUser={this.updateUser}
              handleFindGroup={this.handleFindGroup}
              handleAcceptRejectInvite={this.handleAcceptRejectInvite}
              setNav={this.setNav}
            />
          )}
        />
        <Route
          exact
          path="/creategroup"
          render={() => (
            <CreateGroup
              games={this.state.games}
              user={this.state.user}
              handleCreate={this.handleCreateGroup.bind(this)}
              setNav={this.setNav}
            />
          )}
        />
        <Route
          path="/newuser"
          render={() => <CreateUser onSubmit={this.createUser.bind(this)} />}
        />
        <Route
          path="/group"
          render={() => (
            <Groupview
              group={this.state.group}
              user={this.state.user}
              handleDisban={this.handleDisbanGroup.bind(this)}
              handleInvite={this.handleAcceptRejectInvite.bind(this)}
              setNav={this.setNav}
              handleHonor={this.handleHonor}
              addToParty={this.addToParty}
            />
          )}
        />
      </div>
    );
  }
}
// <Chats />
export default withRouter(App);
