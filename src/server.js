const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

// Tableau pour stocker les utilisateurs par room
const roomUsers = {};

io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('join', (roomId, playerName) => {
      socket.join(roomId);
  
      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }
  
      roomUsers[roomId].push({ socketId: socket.id, playerName });
  
      console.log(`User ${playerName} joined room ${roomId}`);
      console.log(`Users in room ${roomId}:`, roomUsers[roomId]);
  
      // Émettre l'événement pour mettre à jour les utilisateurs dans la room
      io.to(roomId).emit('updateRoomUsers', roomUsers[roomId]);
    });
  
    socket.on('leave', (roomId, playerName) => {
      socket.leave(roomId);
  
      roomUsers[roomId] = roomUsers[roomId].filter(user => user.socketId !== socket.id);
  
      console.log(`User ${playerName} left room ${roomId}`);
      console.log(`Users in room ${roomId}:`, roomUsers[roomId]);
  
      // Émettre l'événement pour mettre à jour les utilisateurs dans la room
      io.to(roomId).emit('updateRoomUsers', roomUsers[roomId]);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
