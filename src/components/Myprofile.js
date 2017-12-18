import React, { Component } from "react";
import {
  Loader,
  Header,
  Card,
  Segment,
  Divider,
  Button,
  Grid,
  Image,
  Item,
  Feed,
  Message,
  Container
} from "semantic-ui-react";

class Myprofile extends Component {
  constructor() {
    super();
    this.handleLfg = this.handleLfg.bind(this);
  }

  handleLfg(e) {
    this.props.updateUser("lfg", !this.props.user.user.lfg);
  }

  createCard(group, owned) {
    return (
      <Card centered raised>
        <Card.Content>
          {!owned ? (
            <Item>
              <Item.Image
                floated="right"
                size="mini"
                src={group.sender.image}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="a">{group.sender.username}s Group</Item.Header>
              </Item.Content>
            </Item>
          ) : null}

          <Divider horizontal>Playing:</Divider>
          <Item>
            <Item.Image size="tiny" floated="right" src={group.game.image} />
            <Item.Content verticalAlign="middle">
              <Item.Header floated="center">{group.game.name}</Item.Header>
            </Item.Content>
          </Item>
        </Card.Content>
        <div className="ui center aligned segment">
          <Button
            circular
            fluid
            color="violet"
            value={group.group_id}
            onClick={this.handleGroupSelect.bind(this)}
          >
            Visit Group
          </Button>
        </div>
      </Card>
    );
  }

  createInvite(invite) {
    return (
      <Feed.Event>
        <Feed.Label image={invite.game.image} />
        <Feed.Content>
          <Feed.Summary>
            <a>{invite.sender.username}</a> invited you to play{" "}
            <a>{invite.game.name}</a>
          </Feed.Summary>
          <Feed.Extra images>
            <Button
              positive
              value={invite.invite_id}
              onClick={this.handleInvite.bind(this)}
            >
              Accept
            </Button>
            <Button
              negative
              value={invite.invite_id}
              onClick={this.handleInvite.bind(this)}
            >
              Reject
            </Button>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }

  handleGroupSelect(e, index) {
    this.props.handleFindGroup(index.value);
  }

  handleInvite(e, index) {
    this.props.handleAcceptRejectInvite(index.children, index.value);
  }

  render() {
    if (!this.props.user.user) {
      return <Loader />;
    }
    return (
      <div>
        <Container fluid>
          <Segment>
            <Segment.Group horizontal>
              <Segment compact>
                <Card centered>
                  <Image src={this.props.user.user.image} />
                  <Card.Content>
                    <Card.Header>
                      Username: {this.props.user.user.username}
                    </Card.Header>
                    {this.props.user.user.lfg ? (
                      <Button
                        circular
                        fluid
                        color="green"
                        onClick={this.handleLfg}
                      >
                        LFG
                      </Button>
                    ) : (
                      <Button
                        circular
                        fluid
                        color="violet"
                        onClick={this.handleLfg}
                      >
                        Not LFG
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              </Segment>
              <Segment>
                <Feed>
                  {this.props.user.invites.length > 0 ? null : (
                    <Message warning>
                      <Message.Header>
                        You have no pending invites!
                      </Message.Header>
                    </Message>
                  )}
                  {this.props.user.invites.map(invite =>
                    this.createInvite(invite)
                  )}
                </Feed>
              </Segment>
            </Segment.Group>
            <Segment.Group>
              <Segment.Group horizontal>
                <Segment>
                  <Divider horizontal>My Groups</Divider>
                  <Card.Group>
                    {this.props.user.groups.owner.map(group =>
                      this.createCard(group, true)
                    )}
                  </Card.Group>
                </Segment>
                <Segment>
                  <Divider horizontal>My Invited Groups</Divider>
                  <Card.Group>
                    {this.props.user.groups.accepted_invites.map(group =>
                      this.createCard(group, false)
                    )}
                  </Card.Group>
                </Segment>
              </Segment.Group>
            </Segment.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default Myprofile;
