import React, { Component } from "react";
import {
  Card,
  Image,
  Popup,
  Button,
  Segment,
  Header,
  Divider,
  Loader,
  Item
} from "semantic-ui-react";

class Groupview extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.group);
  }

  createPartyMember(member) {
    return (
      <Card centered raised>
        <Card.Content>
          <Item>
            <Item.Image size="tiny" floated="right" src={member.image} />
            <Item.Content verticalAlign="middle">
              <Item.Header floated="center">{member.username}</Item.Header>
            </Item.Content>
          </Item>
        </Card.Content>
      </Card>
    );
  }

  render() {
    if (!this.props.group.owner) {
      return <Loader />;
    }
    return (
      <Segment.Group>
        <Segment.Group horizontal>
          <Segment.Group>
            <Card.Group>
              <Card centered>
                <Card.Content>
                  <Divider horizontal>Owner</Divider>
                  <Image
                    floated="right"
                    size="tiny"
                    src={this.props.group.owner.image}
                  />
                  <Card.Header>{this.props.group.owner.username}</Card.Header>
                </Card.Content>
              </Card>
              <Card centered>
                <Card.Content>
                  <Divider horizontal>Game</Divider>
                  <Image
                    floated="right"
                    size="tiny"
                    src={this.props.group.game.image}
                  />
                  <Card.Header>{this.props.group.game.name}</Card.Header>
                </Card.Content>
              </Card>
            </Card.Group>{" "}
            <Segment>
              <Divider horizontal>PartyMembers</Divider>
              <Card.Group>
                {this.props.group.members.map(member =>
                  this.createPartyMember(member)
                )}
              </Card.Group>
            </Segment>
            <Segment>
              <Card.Group>
                <Divider horizontal>PendingInvites</Divider>
                {this.props.group.pending.map(member =>
                  this.createPartyMember(member)
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
