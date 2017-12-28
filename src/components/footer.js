import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

export default class Footer extends Component {
  state = {};
  render() {
    return (
      <Grid centered relaxed>
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row>
          <Segment inverted vertical style={{ padding: "5em 10em" }}>
            <Container>
              <Grid divided stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="About" />
                    <p>
                      {" "}
                      LFG is a website to help gamers build parties -- a smarter
                      way!
                    </p>
                  </Grid.Column>
                  <Grid.Column width={3} />
                  <Grid.Column width={7}>
                    <p>
                      Prototype website created for the fifth module of the
                      Flatiron School.
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
