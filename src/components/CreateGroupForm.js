import React, { Component } from "react";
import { Message, Card, Button, Container } from "semantic-ui-react";
import * as Builders from "../Builders/Builders.js";

class CreateGroupForm extends Component {
  constructor() {
    super();
    this.state = {
      gamers: [],
      gamersLfg: [],
      error: ""
    };
  }

  handleClick = (e, id) => {
    let newGamers = this.state.gamers;
    if (this.state.gamers.includes(id.value)) {
      newGamers = newGamers.filter(currentId => currentId !== id.value);
    } else {
      newGamers.push(id.value);
    }
    this.setState({ gamers: newGamers });
  };

  handleSubmit = e => {
    this.setState({ error: "" });
    if (this.state.gamers.length === 0) {
      this.setState({ error: "Please invite at least one gamer." });
    } else {
      const form = {
        gameId: this.props.gameInfo.game.id,
        gamers: this.state.gamers,
        userId: this.props.user.user.id
      };
      this.props.handleCreate(form);
    }
  };

  render() {
    return (
      <Container>
        <Message positive>
          <Message.Header>
            Gamers who are currently looking to play{" "}
            {this.props.gameInfo.game.name}...
          </Message.Header>
        </Message>
        <Container>
          <Card.Group itemsPerRow={4}>
            {Builders.createGamerCards(
              this.props.gameInfo.users,
              this.props.user.user.id,
              this.state.gamers,
              this.handleClick
            )}
          </Card.Group>
        </Container>
        <div className="ui center aligned segment">
          <Button color="blue" onClick={this.handleSubmit}>
            Create Party
          </Button>
        </div>
        {!!this.state.error ? (
          <Message negative>
            <Message.Header> {this.state.error}</Message.Header>{" "}
          </Message>
        ) : null}
      </Container>
    );
  }
}
export default CreateGroupForm;
