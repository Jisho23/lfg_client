import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Button, Form, Segment, Container, Message } from "semantic-ui-react";
import { Route, withRouter, Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleOnSubmit(this.state.fields);
  };

  render() {
    return (
      <Container>
        <Segment inverted>
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
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          <Container>
            {" "}
            New User? Click <Link to="/newuser"> here </Link> to register!
          </Container>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(Login);
