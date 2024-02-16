import { Server } from "socket.io";
import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
export let playerNumber = 0;

let player1Connected = false;
let player2Connected = false;

io.on('connection', (socket) => {
  console.log('A user connected');

  if (!player1Connected) {
    player1Connected = true;
    socket.emit('playerNumber', 0); 
    socket.data = { playerNumber: 0 };
  } else if (!player2Connected) {
    player2Connected = true;
    socket.emit('playerNumber', 1); 
    socket.data = { playerNumber: 1 };
  } else {
    socket.emit('serverFull'); 
    socket.disconnect(); 
    console.log('Server is full, disconnecting user');
    return;
  }

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const playerNumber = socket.data.playerNumber;
    if (playerNumber === 0) {
      player1Connected = false;
    } else if (playerNumber === 1) {
      player2Connected = false;
    }
  });

  socket.on('keyPressed', (key) => {
    socket.broadcast.emit('keyPressedByEnemy',key);
  });

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
