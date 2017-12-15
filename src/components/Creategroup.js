import React, { Component } from "react";
import { Label, Menu, Form, Button, Message } from "semantic-ui-react";
import CreateGroupForm from "./CreateGroupForm";

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
  }

  handleGameChange(e) {
    this.setState({ gameSearch: e.target.innerText });
  }

  handleGameSearch(e) {
    e.preventDefault;
    if (this.state.gameSearch) {
      this.setState({ error: "" });
      const gameInfo = this.props.games.filter(
        game => game.name === this.state.gameSearch
      )[0];
      fetch(`http://localhost:3001/api/v1/games/${gameInfo.id}`)
        .then(res => res.json())
        .then(json => this.setState({ game: json, searched: true }));
    } else {
      this.setState({ error: "Please choose a game!" });
    }
  }

  render() {
    return (
      <div>
        <Menu inverted size="large">
          <Form inverted onSubmit={this.handleGameSearch.bind(this)}>
            <Form.Select
              width={8}
              label="Search a game"
              options={this.state.options}
              placeholder="Time to choose..."
              onChange={this.handleGameChange.bind(this)}
              name="gameSearch"
            />
            <Form.Button type="submit">LFP...</Form.Button>
          </Form>
        </Menu>
        {!!this.state.error ? (
          <Message negative>
            <Message.Header> {this.state.error}</Message.Header>{" "}
          </Message>
        ) : null}
        {this.state.searched ? (
          <CreateGroupForm gameInfo={this.state.game} />
        ) : null}
      </div>
    );
  }
}
export default CreateGroup;
