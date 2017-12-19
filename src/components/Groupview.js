import React, { Component } from "react";
import * as Builders from "../Builders/Builders.js";
import {
  Card,
  Image,
  Button,
  Segment,
  Divider,
  Loader,
  Item,
  Message
} from "semantic-ui-react";

class Groupview extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.group);
    this.props.setNav("");
  }

  handleInvite = (e, index) => {
    this.props.handleInvite(index.children, index.value);
  };

  handleDisban = (e, index) => {
    this.props.handleDisban(index.value);
  };

  render() {
    if (!this.props.group.owner) {
      return <Loader />;
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
                this.handleDisban
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
                    this.handleInvite
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
                    this.handleInvite
                  )
                )}
              </Card.Group>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              <Divider horizontal>Messages</Divider>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Segment.Group>
    );
  }
}
export default Groupview;
