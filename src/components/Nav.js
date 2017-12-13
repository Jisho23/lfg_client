import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted color={"black"}>
        <Menu.Item name="header">
          <Header
            as="hs"
            content="LFG"
            subheader="A better way to party"
            inverted
          />
        </Menu.Item>
        <br />
        <Menu.Item
          name="login"
          onClick={this.handleItemClick}
          active={activeItem === "login"}
        >
          Login
        </Menu.Item>
        <Menu.Item
          name="games"
          onClick={this.handleItemClick}
          active={activeItem === "games"}
        >
          Browse games
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
