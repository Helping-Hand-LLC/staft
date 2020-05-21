const app = require('./app');
const { port } = require('./config/keys');

app.listen(port, () =>
  console.log(`express server listening on port ${port}...`)
);
