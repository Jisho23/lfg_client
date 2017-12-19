import React, { Component } from "react";
import { Menu, Form, Message, Container } from "semantic-ui-react";
import CreateGroupForm from "./CreateGroupForm";
import * as Api from "../Api/Index.js";

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      game: {},
      options: [],
      gameSearch: "",
      searched: false,
      error: ""
    };
  }

  componentDidMount() {
    let options = this.props.games.map(game => ({
      key: game.id,
      text: game.name,
      value: game.id
    }));
    this.setState({ options: options });
    this.props.setNav("creategroup");
  }

  handleGameChange = e => {
    this.setState({ gameSearch: e.target.innerText });
  };

  handleGameSearch = e => {
    e.preventDefault;
    if (this.state.gameSearch) {
      this.setState({ error: "" });
      const gameInfo = this.props.games.filter(
        game => game.name === this.state.gameSearch
      )[0];
      Api.fetchGameInfo(gameInfo.id)
        .then(res => res.json())
        .then(json => this.setState({ game: json, searched: true }));
    } else {
      this.setState({ error: "Please choose a game!" });
    }
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Menu inverted size="large">
            <Menu.Item borderless>
              <Form inverted onSubmit={this.handleGameSearch}>
                <Form.Select
                  width={8}
                  label="Search a game"
                  options={this.state.options}
                  placeholder="Time to choose..."
                  onChange={this.handleGameChange}
                  name="gameSearch"
                />
                <Form.Button color="violet" circular type="submit">
                  LFP...
                </Form.Button>
              </Form>
            </Menu.Item>
          </Menu>
          {!!this.state.error ? (
            <Message negative>
              <Message.Header> {this.state.error}</Message.Header>{" "}
            </Message>
          ) : null}
          {this.state.searched ? (
            <CreateGroupForm
              gameInfo={this.state.game}
              user={this.props.user}
              handleCreate={this.props.handleCreate}
            />
          ) : null}
        </Container>
      </div>
    );
  }
}
export default CreateGroup;
