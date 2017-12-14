import React, { Component } from "react";
import {
  Loader,
  Card,
  Segment,
  Divider,
  Button,
  Grid,
  Image
} from "semantic-ui-react";

class Myprofile extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.updateUser("lfg", !this.props.user.user.lfg);
  }

  render() {
    if (!this.props.user.user) {
      return <Loader />;
    }
    return (
      <div>
        <Card>
          <Image src={this.props.user.user.image} />
          <Card.Content>
            <Card.Header>Username: {this.props.user.user.username}</Card.Header>
            {this.props.user.user.lfg ? (
              <Button circular positive onClick={this.handleClick}>
                LFG
              </Button>
            ) : (
              <Button circular onClick={this.handleClick}>
                LFG
              </Button>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Myprofile;
