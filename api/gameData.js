import { clientCredentials } from '../utils/client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamestypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const updateGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export {
  getGames, createGame, getGameTypes, updateGame, getSingleGame,
};
