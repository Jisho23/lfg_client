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
  Item,
  Message
} from "semantic-ui-react";

class Groupview extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.group);
  }

  handleInvite(e, index) {
    this.props.handleInvite(index.children, index.value);
  }

  handleDisban(e, index) {
    this.props.handleDisban(index.value);
  }

  createPartyMember(member) {
    return (
      <Card centered raised>
        <Card.Content>
          <Item>
            <Item.Image
              size="tiny"
              floated="right"
              src={member.recipient.image}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header floated="center">
                {member.recipient.username}
              </Item.Header>
            </Item.Content>
          </Item>
        </Card.Content>
        {this.props.user.user.id === this.props.group.owner.id ? (
          <Button
            negative
            fluid
            value={member.invite_id}
            onClick={this.handleInvite.bind(this)}
            attached="bottom"
          >
            Kick Player?
          </Button>
        ) : null}
        {member.recipient.id === this.props.user.user.id ? (
          <Button
            fluid
            attached="bottom"
            value={member.invite_id}
            onClick={this.handleInvite.bind(this)}
            color="violet"
          >
            Leave Party?
          </Button>
        ) : null}
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
            <Segment>
              <Divider horizontal>Party Info</Divider>
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
                  {this.props.user.user.id === this.props.group.owner.id ? (
                    <Message warning>
                      <Button
                        negative
                        attached="bottom"
                        value={this.props.group.id}
                        onClick={this.handleDisban.bind(this)}
                      >
                        Disban?
                      </Button>
                    </Message>
                  ) : null}
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
              </Card.Group>
            </Segment>
            <Segment>
              <Divider horizontal>Party Members</Divider>
              <Card.Group>
                {this.props.group.members.map(member =>
                  this.createPartyMember(member)
                )}
              </Card.Group>
            </Segment>
            <Segment>
              <Card.Group>
                <Divider horizontal>Pending Invites</Divider>
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
