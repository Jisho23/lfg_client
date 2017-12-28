import React, { Component } from "react";
import * as Builders from "../Builders/Builders.js";
import { Card, Segment, Divider, Form, Message } from "semantic-ui-react";
import Chats from "./Chats.js";
import { withRouter } from "react-router-dom";

class Groupview extends Component {
  constructor() {
    super();
    this.state = { message: {}, userToAdd: "" };
  }

  componentDidMount() {
    this.props.setNav("");
  }

  handleInvite = (e, index) => {
    this.props.handleInvite(index.children, index.value);
  };

  handleDisban = (e, index) => {
    this.props.handleDisban(index.value);
  };

  handleHonor = (e, index) => {
    index.value.honorer = this.props.user.user.id;
    this.props.handleHonor(index.value);
  };

  handleChange = e => {
    this.setState({ userToAdd: e.target.innerText });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = {
      user: this.state.userToAdd,
      groupId: this.props.group.id,
      senderId: this.props.user.user.id
    };
    this.props.addToParty(form);
    this.setState({
      message: {
        success: true,
        content: `Invite to ${this.state.userToAdd} sent!`
      }
    });
  };

  render() {
    if (!this.props.group.owner) {
      this.props.history.push("/myprofile");
      return null;
    }

    return (
      <Segment.Group horizontal>
        <Segment.Group>
          <Segment>
            <Divider horizontal>Party Info</Divider>
            {Builders.partyInfoCard(
              this.props.group,
              this.props.user,
              this.handleDisban,
              this.handleHonor
            )}
          </Segment>
          <Segment>
            <Divider horizontal>Party Members</Divider>
            <Card.Group itemsPerRow={3}>
              {this.props.group.members.map(member =>
                Builders.createPartyMember(
                  member,
                  this.props.user,
                  this.props.group,
                  this.handleInvite,
                  this.handleHonor
                )
              )}
            </Card.Group>
          </Segment>
          {this.props.user.user.id === this.props.group.owner.id ? (
            <Segment>
              <Form size="tiny" onSubmit={this.handleSubmit}>
                {" "}
                <Form.Group>
                  <Form.Select
                    placeholder="Add more players?"
                    options={this.props.options}
                    onChange={this.handleChange}
                  />
                  <Form.Button size="tiny" color="blue">
                    Add Player to Party
                  </Form.Button>
                </Form.Group>
              </Form>
            </Segment>
          ) : null}
          <Segment>
            {this.state.message.success ? (
              <Message success content={this.state.message.content} />
            ) : null}
            <Divider horizontal>Pending Invites</Divider>
            <Card.Group itemsPerRow={3}>
              {this.props.group.pending.map(member =>
                Builders.createPartyMember(
                  member,
                  this.props.user,
                  this.props.group,
                  this.handleInvite,
                  this.handleHonor
                )
              )}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Divider horizontal>LiveChat</Divider>
            <Chats group={this.props.group} user={this.props.user.user} />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}
export default withRouter(Groupview);
