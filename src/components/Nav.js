import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    if (name === "logout") {
      this.props.handleLogout();
    } else {
      this.props.history.push(`/${name}`);
    }
  };

  render() {
    return (
      <Menu inverted color={"black"}>
        <Link to="/">
          <Menu.Item name="header">
            <Header
              as="hs"
              content="LFG"
              subheader="A better way to party"
              inverted
            />
          </Menu.Item>
        </Link>
        <br />
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="myprofile"
            onClick={this.handleItemClick}
            active={this.props.nav === "myprofile"}
          >
            MyProfile
          </Menu.Item>
        ) : (
          <Menu.Item
            name="login"
            onClick={this.handleItemClick}
            active={this.props.nav === "login"}
          >
            Login
          </Menu.Item>
        )}
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="creategroup"
            onClick={this.handleItemClick}
            active={this.props.nav === "creategroup"}
          >
            CreateGroup
          </Menu.Item>
        ) : null}
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="games"
            onClick={this.handleItemClick}
            active={this.props.nav === "games"}
          >
            Browse games
          </Menu.Item>
        ) : null}

        {this.props.isLoggedIn ? (
          <Menu.Item
            name="logout"
            onClick={this.handleItemClick.bind(this)}
            active={this.props.nav === "login"}
          >
            LogOut
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
