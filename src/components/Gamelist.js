import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import * as Builders from "../Builders/Builders.js";

class Gamelist extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.setNav("games");
  }

  handleClick = (e, id) => {
    let performAction = "";
    if (id.children === "Add Game to Collection") {
      performAction = "add";
    } else {
      performAction = "remove";
    }
    const toDo = {
      performAction: performAction,
      gameId: id.value,
      userId: this.props.appState.user.user.id
    };
    this.props.addRemoveGame(toDo);
  };

  render() {
    return (
      <div>
        <Container>
          {this.props.appState.authorization.isLoggedIn ? (
            <Card.Group itemsPerRow={4}>
              {Builders.createGameCards(
                this.props.games,
                this.props.appState.user,
                this.handleClick
              )}
            </Card.Group>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default Gamelist;
