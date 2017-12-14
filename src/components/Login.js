import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: "",
        password: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleOnSubmit(this.state.fields);
  }

  render() {
    return (
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
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;
