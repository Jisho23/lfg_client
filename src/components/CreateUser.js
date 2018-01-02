import React, { Component } from "react";
import {
  Message,
  Container,
  Form,
  Image,
  Button,
  Segment,
  Checkbox,
  Grid
} from "semantic-ui-react";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: "",
        password: "",
        passwordConfirm: "",
        image: "http://ak3.picdn.net/shutterstock/videos/267883/thumb/10.jpg"
      },
      terms: false,
      error: ""
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: "" });
    if (!this.state.terms) {
      this.setState({ error: "Please accepts the terms and conditions!" });
    } else if (
      this.state.fields.password === "" ||
      this.state.fields.username === ""
    ) {
      this.setState({ error: "No blank forms please!" });
    } else if (
      this.state.fields.password !== this.state.fields.passwordConfirm &&
      this.state.fields.password !== ""
    ) {
      this.setState({ error: "Please make sure your passwords match!" });
    } else {
      this.props.onSubmit(this.state.fields);
    }
  };

  handleToggle = e => {
    const newState = this.state.terms;
    this.setState({ terms: !newState });
  };

  render() {
    return (
      <Container>
        <Segment inverted>
          <Grid columns={2}>
            <Grid.Column>
              <Form inverted onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Username"
                    placeholder="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Confirm Password"
                    placeholder="password"
                    type="password"
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="ImageUrl"
                  placeholder="put an image url here"
                  name="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Checkbox}
                  label="I agree to the Terms and Conditions"
                  onChange={this.handleToggle}
                />

                <Button color="violet" type="submit">
                  Create User
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Container>
                <Image
                  floated="right"
                  src={this.state.fields.image}
                  size="medium"
                />
              </Container>{" "}
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.error ? (
          <Message negative>{this.state.error}</Message>
        ) : null}
      </Container>
    );
  }
}

export default CreateUser;
