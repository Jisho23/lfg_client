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
  Grid,
  Header,
  Form
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
      <Container fluid>
        <Segment.Group horizontal>
          <Segment>
            <Card centered>
              <Image src={this.props.user.user.image} />
              <Card.Content>
                <Card.Header>
                  Username: {this.props.user.user.username}
                </Card.Header>
                <Segment>Honor: {this.props.user.honor.length}</Segment>
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
                  <Button circular fluid color="blue" onClick={this.handleLfg}>
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
            <Grid>
              <Grid.Column width={3}>
                <Menu tabular>
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
              </Grid.Column>
              <Container>
                <Grid.Column width={12}>
                  {this.state.view === "Feed" ? (
                    <Container>
                      {" "}
                      <Header as="h3" textAlign="center">
                        Feed
                      </Header>
                      <Divider />
                      <Segment>
                        <Feed>
                          {this.props.user.invites.map(invite =>
                            Builders.createInvite(invite, this.handleInvite)
                          )}
                        </Feed>
                      </Segment>
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
                </Grid.Column>
              </Container>
            </Grid>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default Myprofile;
