import app from './app';
import { port } from './config/keys';

// start server
app.listen(port, () =>
  console.log(`express server listening on port ${port}...`)
);
