import Client from './Client';

const Sources = Client.then((client) => {
  return client.sources.fetch();
});

export default Sources;
