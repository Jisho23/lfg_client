import React, { Component } from "react";
import * as Builders from "../Builders/Builders.js";
import {
  Loader,
  Card,
  Segment,
  Divider,
  Button,
  Image,
  Feed,
  Container,
  Menu,
  Header,
  Form,
  Grid
} from "semantic-ui-react";

class Myprofile extends Component {
  constructor() {
    super();
    this.state = { view: "Feed", status: "" };
    this.handleLfg = this.handleLfg.bind(this);
  }

  componentDidMount() {
    this.props.setNav("myprofile");
  }

  handleLfg = e => {
    this.props.updateUser("lfg", !this.props.user.user.lfg);
  };

  handleSubmit = (e, value) => {
    e.preventDefault();
    this.props.updateUser("status", this.state.status);
    this.setState({ status: "" });
  };

  handleGroupSelect = (e, index) => {
    this.props.handleFindGroup(index.value);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = (e, index) => {
    this.props.handleAcceptRejectInvite(index.children, index.value);
  };

  changeView = (e, { name }) => {
    this.setState({ view: name });
  };

  render() {
    if (!this.props.user.user) {
      return <Loader />;
    }
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card centered>
                <Image circular src={this.props.user.user.image} />
                <Card.Content>
                  <Card.Header>
                    Username: {this.props.user.user.username}
                  </Card.Header>
                  <Segment textAlign="center">
                    <strong>Honor: </strong>
                    {this.props.user.honor.length}
                  </Segment>
                  <Segment>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Input
                        name="status"
                        placeholder={this.props.user.user.status}
                        value={this.state.status}
                        onChange={this.handleChange}
                      />
                      <Form.Button fluid color="violet">
                        UpdateStatus
                      </Form.Button>
                    </Form>
                  </Segment>
                  {this.props.user.user.lfg ? (
                    <Button
                      circular
                      fluid
                      color="yellow"
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
            </Grid.Column>
            <Grid.Column width={12}>
              <Menu fluid inverted attached="top" tabular>
                <Menu.Item
                  name="Feed"
                  active={this.state.view === "Feed"}
                  onClick={this.changeView}
                />
                <Menu.Item
                  active={this.state.view === "MyGroups"}
                  name="MyGroups"
                  onClick={this.changeView}
                />
                <Menu.Item
                  active={this.state.view === "MyInvited"}
                  name="MyInvited"
                  onClick={this.changeView}
                />
              </Menu>
              <Segment attached="bottom">
                {this.state.view === "Feed" ? (
                  <Container>
                    {" "}
                    <Header as="h3" textAlign="center">
                      Feed
                    </Header>
                    <Divider />
                    <Grid columns="three">
                      <Grid.Column width={4} />
                      <Grid.Column width={7}>
                        <Feed>
                          {this.props.user.invites.map(invite =>
                            Builders.createInvite(invite, this.handleInvite)
                          )}
                        </Feed>
                      </Grid.Column>
                      <Grid.Column width={3} />
                    </Grid>
                  </Container>
                ) : null}
                {this.state.view === "MyGroups" ? (
                  <Container>
                    {" "}
                    <Header as="h3" textAlign="center">
                      My Groups
                    </Header>
                    <Divider />
                    <Card.Group>
                      {Builders.createCardGroup(
                        this.props.user.groups.owner,
                        true,
                        this.handleGroupSelect
                      )}
                    </Card.Group>{" "}
                  </Container>
                ) : null}
                {this.state.view === "MyInvited" ? (
                  <Container>
                    {" "}
                    <Header as="h3" textAlign="center">
                      My Invited Groups
                    </Header>
                    <Divider />
                    <Card.Group>
                      {this.props.user.groups.accepted_invites.map(group =>
                        Builders.createCard(
                          group,
                          false,
                          this.handleGroupSelect
                        )
                      )}
                    </Card.Group>
                  </Container>
                ) : null}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Myprofile;
