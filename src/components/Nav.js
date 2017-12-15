import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    if (name === "logout") {
      this.props.handleLogout();
    } else {
      this.setState({ activeItem: name });
      this.props.history.push(`/${name}`);
    }
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing inverted color={"black"}>
        <Menu.Item name="header">
          <Header
            as="hs"
            content="LFG"
            subheader="A better way to party"
            inverted
          />
        </Menu.Item>
        <br />
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="myprofile"
            onClick={this.handleItemClick}
            active={activeItem === "myprofile"}
          >
            MyProfile
          </Menu.Item>
        ) : (
          <Menu.Item
            name="login"
            onClick={this.handleItemClick}
            active={activeItem === "login"}
          >
            Login
          </Menu.Item>
        )}
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="creategroup"
            onClick={this.handleItemClick}
            active={activeItem === "creategroup"}
          >
            CreateGroup
          </Menu.Item>
        ) : null}
        <Menu.Item
          name="games"
          onClick={this.handleItemClick}
          active={activeItem === "games"}
        >
          Browse games
        </Menu.Item>
        {this.props.isLoggedIn ? (
          <Menu.Item
            name="logout"
            onClick={this.handleItemClick.bind(this)}
            active={activeItem === "login"}
          >
            LogOut
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
