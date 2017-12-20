import React, { Component } from "react";
import * as Builders from "../Builders/Builders.js";
import { Card, Segment, Divider } from "semantic-ui-react";
import Chats from "./Chats.js";
import { withRouter } from "react-router-dom";

class Groupview extends Component {
  state = {};
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
            <Segment>
              <Card.Group>
                <Divider horizontal>Pending Invites</Divider>
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
              <Divider horizontal>Messages</Divider>
              <Chats group={this.props.group} user={this.props.user.user} />
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Segment.Group>
    );
  }
}
export default withRouter(Groupview);
