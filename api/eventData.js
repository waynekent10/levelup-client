const endpoint = 'http://localhost:8000';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents };
