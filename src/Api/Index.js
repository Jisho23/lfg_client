export const createUser = form => {
  fetch(`http://localhost:3001/api/v1/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then(() => {
      debugger;
    });
};

export const addRemoveGame = toDo => {
  fetch("http://localhost:3001/api/v1/addRemoveGame", {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(toDo)
  });
  const state = {};
  if (toDo.performAction === "add") {
    const state = this.state.user.games.push(toDo.gameId);
  } else {
    const state = this.state.user.games.filter(game => game !== toDo.gameId);
  }
  debugger;
  this.setState({ state });
};
