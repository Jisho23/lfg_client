import React, { Component } from "react";
import {
  Card,
  Image,
  Popup,
  Button,
  Segment,
  Container
} from "semantic-ui-react";

class Gamelist extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  getGames() {
    const games = this.props.games.map(game => {
      return (
        <Card raised>
          <Image src={game.image} />{" "}
          <Card.Content>
            <Segment textAlign="center">
              <Card.Header>{game.name}</Card.Header>
            </Segment>
          </Card.Content>
          {this.props.appState.user.games.includes(game.id) ? (
            <Button
              color="purple"
              fluid
              onClick={this.handleClick}
              value={game.id}
              attached="bottom"
            >
              Remove Game From Collection
            </Button>
          ) : (
            <Button
              color="violet"
              attached="bottom"
              fluid
              onClick={this.handleClick}
              value={game.id}
            >
              Add Game to Collection
            </Button>
          )}
        </Card>
      );
    });
    return games;
  }

  handleClick(e, id) {
    let performAction = "";
    if (id.children === "Add Game to Collection") {
      performAction = "add";
    } else {
      performAction = "remove";
    }
    this.props.addRemoveGame(performAction, id.value);
  }

  render() {
    return (
      <div>
        <Container>
          {this.props.appState.authorization.isLoggedIn ? (
            <Card.Group itemsPerRow={4}>{this.getGames()}</Card.Group>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default Gamelist;
