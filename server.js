const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let documentContent = ''; // Store document content

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send current document content to the new user
  socket.emit('load-document', documentContent);

  // Listen for text changes from clients
  socket.on('send-changes', (delta) => {
    // Broadcast the changes to all other clients
    socket.broadcast.emit('receive-changes', delta);
  });

  // Listen for full document updates
  socket.on('save-document', (data) => {
    documentContent = data; // Update the server copy of the document
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
