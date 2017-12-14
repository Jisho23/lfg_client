import React, { Component } from "react";
import { Card, Image, Popup, Button } from "semantic-ui-react";

class Gamelist extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  getGames() {
    const games = this.props.games.map(game => {
      return (
        <Card raised>
          <Image src={game.image} />
          <Card.Header>{game.name}</Card.Header>
          {this.props.appState.user.games.includes(game.id) ? (
            <Button color="purple" onClick={this.handleClick} value={game.id}>
              > Remove Game From Collection
            </Button>
          ) : (
            <Button color="violet" onClick={this.handleClick} value={game.id}>
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
        {this.props.appState.authorization.isLoggedIn ? (
          <Card.Group itemsPerRow={4}>{this.getGames()}</Card.Group>
        ) : null}
      </div>
    );
  }
}

export default Gamelist;
