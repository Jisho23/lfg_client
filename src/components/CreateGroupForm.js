import React, { Component } from "react";
import {
  Transition,
  Message,
  Form,
  Checkbox,
  Card,
  Image,
  Button,
  Item,
  Segment
} from "semantic-ui-react";
class CreateGroupForm extends Component {
  constructor() {
    super();
    this.state = {
      gamers: [],
      gamersLfg: [],
      error: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e, id) {
    let newGamers = this.state.gamers;
    if (this.state.gamers.includes(id.value)) {
      newGamers = newGamers.filter(currentId => currentId !== id.value);
    } else {
      newGamers.push(id.value);
    }
    this.setState({ gamers: newGamers });
  }

  handleSubmit(e) {
    this.setState({ error: "" });
    if (this.state.gamers.length === 0) {
      this.setState({ error: "Please invite at least one gamer." });
    } else {
      const form = {
        gameId: this.props.gameInfo.id,
        gamers: this.state.gamers,
        userId: this.props.user.user.id
      };
      debugger;
      this.props.handleCreate(form);
    }
  }

  render() {
    return (
      <div>
        <Message positive>
          <Message.Header>
            Gamers who are currently looking to play {this.props.gameInfo.name}...
          </Message.Header>
        </Message>
        <Card.Group itemsPerRow={4}>
          {this.props.gameInfo.users.map(user => {
            if (user.lfg) {
              return (
                <Card raised>
                  <Card.Content>
                    <Image floated="right" size="mini" src={user.image} />
                    <Card.Header>{user.username}</Card.Header>
                    {this.state.gamers.includes(user.id) ? (
                      <Button
                        color="purple"
                        onClick={this.handleClick}
                        value={user.id}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        color="purple"
                        onClick={this.handleClick}
                        value={user.id}
                      >
                        Add
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              );
            }
          })}
        </Card.Group>
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
      </div>
    );
  }
}
export default CreateGroupForm;
