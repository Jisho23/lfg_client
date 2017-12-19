import React, { Component } from "react";
import ActionCable from "actioncable";
import { Container, Form, Button, Segment, Image } from "semantic-ui-react";

export default class Chats extends Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      chats: [],
      message: ""
    };
    this.subscribeChannel();
  }

  addChat = chat => {
    const newMessages = this.state.chats;
    newMessages.unshift(chat);
    if (newMessages.length > 10) {
      newMessages.pop;
    }
    this.setState({
      chats: newMessages
    });
  };

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  subscribeChannel() {
    const cable = ActionCable.createConsumer("ws://localhost:3001/cable");
    cable.subscriptions.create(
      { channel: "RoomChannel", group: this.props.group.id },
      {
        received: data => {
          // this.addChat(data.chat);
          console.log(this.state.chats);
          this.addChat(data);
        }
      }
    );
  }

  handlePostMessage = () => {
    this.setState({ message: "" });
    fetch(`http://localhost:3001/api/v1/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        message: this.state.message,
        user_id: this.props.user.id,
        group_id: this.props.group.id
      })
    });
  };

  render() {
    return (
      <div>
        <Segment>
          <Form onSubmit={this.handlePostMessage}>
            <Form.Group fluid>
              <Form.Input
                value={this.state.message}
                onChange={this.handleChange}
              />
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Segment>
        <Segment.Group>
          {this.state.chats.map(message => (
            <Segment small piled>
              <Image src={message.image} avatar />
              {message.content}
            </Segment>
          ))}
        </Segment.Group>
      </div>
    );
  }
}

// boilerplate post:
// fetch(`http://localhost:3001/api/v1/messages`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       accept: "application/json",
//     },
//     body: JSON.stringify({content: 'message', user_id: int, group_id: int})
//   });
