const URL = "http://localhost:3001/api/v1";

export const fetchaddRemoveGame = toDo => {
  return fetch(URL + "/addRemoveGame", {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(toDo)
  });
};

export const handleCreateGroup = form => {
  return fetch(URL + `/groups`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify(form)
  });
};

export const fetchGames = () => fetch(URL + "/games");

export const login = form => {
  return fetch(URL + `/auth`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify(form)
  });
};

export const findCurrentUser = () => {
  return fetch(URL + `/current_user`, {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: parseJwt(localStorage.getItem("jwt")).user_id
    }
  });
};

export const updateUser = (userId, newState) => {
  return fetch(URL + `/users/${userId}`, {
    method: "PATCH",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(newState)
  });
};

export const handleAcceptRejectInvite = body => {
  return fetch(URL + `/invites/${body.invite_id}`, {
    method: "PATCH",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(body)
  });
};

export const handleFindGroup = groupId => {
  return fetch(URL + `/groups/${groupId}`);
};

export const handleDisbanGroup = groupId => {
  return fetch(URL + `/groups/${groupId}`, {
    method: "DELETE",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ group_id: groupId })
  });
};

export const createUser = form => {
  return fetch(URL + `/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify(form)
  });
};

export const fetchGameInfo = gameId => {
  return fetch(URL + `/games/${gameId}`);
};

const parseJwt = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};
