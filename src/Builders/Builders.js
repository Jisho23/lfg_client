import React from "react";
import {
  Message,
  Segment,
  Card,
  Image,
  Button,
  Item,
  Divider,
  Feed,
  Icon
} from "semantic-ui-react";

export const createGamerCards = (users, currentUser, gamers, onToggle) => {
  return users.map(user => {
    if (user.lfg && user.id !== currentUser) {
      return (
        <Card raised key={user.id}>
          <Card.Content>
            <Image bordered floated="right" size="tiny" src={user.image} />
            <Card.Header>{user.username}</Card.Header>
          </Card.Content>
          {gamers.includes(user.id) ? (
            <Button color="violet" onClick={onToggle} value={user.id}>
              Remove
            </Button>
          ) : (
            <Button color="blue" onClick={onToggle} value={user.id}>
              Add
            </Button>
          )}
        </Card>
      );
    }
  });
};

export const createGameCards = (games, user, handleClick) => {
  return games.map(game => {
    return (
      <Card key={game.id} raised>
        <Card.Content>
          <Image bordered src={game.image} />{" "}
        </Card.Content>
        <Segment textAlign="center">
          <Card.Header>{game.name}</Card.Header>
        </Segment>
        <Segment textAlign="center">Platform: {game.platform}</Segment>
        {user.games.includes(game.id) ? (
          <Button
            color="purple"
            fluid
            onClick={handleClick}
            value={game.id}
            attached="bottom"
          >
            Remove Game From Collection
          </Button>
        ) : (
          <Button
            color="violet"
            attached="bottom"
            fluid
            onClick={handleClick}
            value={game.id}
          >
            Add Game to Collection
          </Button>
        )}
      </Card>
    );
  });
};

export const createPartyMember = (
  member,
  user,
  group,
  handleInvite,
  handleHonor
) => {
  return (
    <Card key={member.recipient.id} centered raised>
      <Card.Content>
        <Image
          bordered
          size="tiny"
          floated="right"
          src={member.recipient.image}
        />
        <Card.Header floated="center">{member.recipient.username}</Card.Header>
        <Card.Meta> - "{member.recipient.status}"</Card.Meta>
        {user.honored
          .map(honor => honor.honored_id)
          .includes(member.recipient.id) ? (
          <Button
            icon
            color="yellow"
            value={{ toDo: "remove", honored: member.recipient.id }}
            onClick={handleHonor}
          >
            <Icon name="star" />
          </Button>
        ) : null}
        {!user.honored
          .map(honor => honor.honored_id)
          .includes(member.recipient.id) &&
        user.user.id !== member.recipient.id ? (
          <Button
            icon
            color="grey"
            value={{ toDo: "honor", honored: member.recipient.id }}
            onClick={handleHonor}
          >
            <Icon name="star" />
          </Button>
        ) : null}
      </Card.Content>
      {user.user.id === group.owner.id ? (
        <Button
          color="violet"
          fluid
          value={member.invite_id}
          onClick={handleInvite}
          attached="bottom"
        >
          Kick Player?
        </Button>
      ) : null}
      {member.recipient.id === user.user.id ? (
        <Button
          fluid
          attached="bottom"
          value={member.invite_id}
          onClick={handleInvite}
          color="violet"
        >
          Leave Party?
        </Button>
      ) : null}
    </Card>
  );
};

export const partyInfoCard = (group, user, handleDisban, handleHonor) => {
  return (
    <Card.Group>
      <Card centered key={group.id}>
        <Card.Content>
          <Divider horizontal>Owner</Divider>
          <Image floated="right" size="tiny" bordered src={group.owner.image} />
          <Card.Header>{group.owner.username}</Card.Header>
          <Card.Meta> - "{group.owner.status}"</Card.Meta>
          {user.honored
            .map(honor => honor.honored_id)
            .includes(group.owner.id) ? (
            <Button
              icon
              color="yellow"
              value={{ toDo: "remove", honored: group.owner.id }}
              onClick={handleHonor}
            >
              <Icon name="star" />
            </Button>
          ) : null}
          {!user.honored
            .map(honor => honor.honored_id)
            .includes(group.owner.id) && group.owner.id !== user.user.id ? (
            <Button
              icon
              color="violet"
              value={{ toDo: "honor", honored: group.owner.id }}
              onClick={handleHonor}
            >
              <Icon name="star" />
            </Button>
          ) : null}
        </Card.Content>
        {user.user.id === group.owner.id ? (
          <Message warning>
            <Button
              color="violet"
              attached="bottom"
              value={group.id}
              onClick={handleDisban}
            >
              Disban?
            </Button>
          </Message>
        ) : null}
      </Card>
      <Card centered>
        <Card.Content>
          <Divider horizontal>Game</Divider>
          <Image bordered floated="right" size="tiny" src={group.game.image} />
          <Card.Header>{group.game.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Segment>Platform: {group.game.platform}</Segment>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export const createCardGroup = (owner, owned, handleGroupSelect) => {
  return owner.map(group => createCard(group, owned, handleGroupSelect));
};

export const createCard = (group, owned, handleGroupSelect) => {
  return (
    <Card centered key={group.id} raised>
      <Card.Content>
        {!owned ? (
          <Item>
            <Item.Image
              bordered
              floated="right"
              size="mini"
              src={group.sender.image}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header>{group.sender.username}s Group</Item.Header>
            </Item.Content>
          </Item>
        ) : null}
        <Divider horizontal>Playing:</Divider>
        <Item>
          <Item.Image
            bordered
            size="tiny"
            floated="right"
            src={group.game.image}
          />
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
          onClick={handleGroupSelect}
        >
          Visit Group
        </Button>
      </div>
    </Card>
  );
};

export const createInvite = (invite, handleInvite) => {
  return (
    <Feed.Event key={invite.id}>
      <Feed.Label bordered image={invite.game.image} />
      <Feed.Content>
        <Feed.Summary>
          {invite.sender.username} invited you to play {invite.game.name}!
        </Feed.Summary>
        <Feed.Extra images>
          <Button color="blue" value={invite.invite_id} onClick={handleInvite}>
            Accept
          </Button>
          <Button
            color="violet"
            value={invite.invite_id}
            onClick={handleInvite}
          >
            Reject
          </Button>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};
