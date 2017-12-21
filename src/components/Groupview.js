import React, { Component } from "react";
import * as Builders from "../Builders/Builders.js";
import { Card, Segment, Divider, Form } from "semantic-ui-react";
import Chats from "./Chats.js";
import { withRouter } from "react-router-dom";
import * as Api from "../Api/Index.js";

class Groupview extends Component {
  constructor() {
    super();
    this.state = { otherUsers: [], userToAdd: "" };
  }

  componentDidMount() {
    this.props.setNav("");
    if (this.props.group.game) {
      Api.fetchGameInfo(this.props.group.game.id)
        .then(res => res.json())
        .then(json => this.filterPlayers(json.users));
    }
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

  filterPlayers = users => {
    let otherUsers = users;
    this.props.group.members.forEach(member => {
      otherUsers = otherUsers.filter(
        otherUser => otherUser.id !== member.recipient.id
      );
    });
    this.props.group.pending.forEach(member => {
      otherUsers = otherUsers.filter(
        otherUser => otherUser.id !== member.recipient.id
      );
    });
    otherUsers = otherUsers.filter(user => user.id !== this.props.user.user.id);
    this.setState({
      otherUsers: otherUsers.map(user => {
        const newObj = { text: user.username, value: user.id, key: user.id };
        return newObj;
      })
    });
    console.log(this.state);
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
  };

  render() {
    if (!this.props.group.owner) {
      this.props.history.push("/myprofile");
      return null;
    }
    return (
      <Segment.Group>
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
              <Card.Group>
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
                {this.state.otherUsers ? (
                  <Form size="tiny" onSubmit={this.handleSubmit}>
                    {" "}
                    <Form.Group>
                      <Form.Select
                        placeholder="Add more players?"
                        options={this.state.otherUsers}
                        onChange={this.handleChange}
                      />
                      <Form.Button size="tiny" color="blue">
                        Add Player to Party
                      </Form.Button>
                    </Form.Group>
                  </Form>
                ) : null}
              </Segment>
            ) : null}
            <Segment>
              <Divider horizontal>Pending Invites</Divider>
              <Card.Group>
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
      </Segment.Group>
    );
  }
}
export default withRouter(Groupview);
