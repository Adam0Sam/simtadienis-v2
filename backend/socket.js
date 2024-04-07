const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

function initializeSocket(server) {

  const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://lic100.lt';
  const io = new Server(server, {
    cors: {
      origin: origin, // Replace with your React frontend URL
      methods: ["GET", "POST"],
    },
  });

  return io;
}

module.exports = {
  initializeSocket
}