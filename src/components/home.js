import React, { Component } from "react";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Homepage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Segment
          textAlign="center"
          style={{ minHeight: 350, padding: "1em 0em" }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content="LFG"
              style={{
                fontSize: "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: "3em"
              }}
            />
            <Header
              as="h2"
              content="Looking for Group"
              style={{ fontSize: "1.7em", fontWeight: "normal" }}
            />
            <Link to="/newuser">
              <Button color="violet" size="huge">
                Join the party!
                <Icon name="right arrow" />
              </Button>
            </Link>
          </Container>
        </Segment>
      </div>
    );
  }
}
