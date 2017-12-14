import React, { Component } from "react";
import { Card, Image, Popup } from "semantic-ui-react";

const Gamelist = props => {
  const games = props.games.map(game => {
    return (
      <Card raised>
        <Image src={game.image} />
        <Card.Header>{game.name}</Card.Header>
      </Card>
    );
  });
  return (
    <div>
      <Card.Group itemsPerRow={4}>{games}</Card.Group>
    </div>
  );
};

export default Gamelist;
