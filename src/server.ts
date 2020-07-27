import app from './app';
import socketio from 'socket.io';
import { port } from './config/keys';

// start server
const server = app.listen(port, () =>
  console.log(`express server listening on port ${port}...`)
);

// configure web socket
const io = socketio.listen(server);

io.on('connection', socket => {
  console.log(`socket ${socket.id} connected`);
});
