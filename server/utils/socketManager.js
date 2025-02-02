// socketManager.js
const socketIO = require('socket.io');

class SocketManager {
  constructor() {
    this.io = null;
  }

  initialize(server) {
    this.io = socketIO(server, {
      cors: {
        origin: "http://localhost:3000", // Replace with your React app's URL
        methods: ["GET", "POST"]
      }
    });
    
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  getIO() {
    if (!this.io) {
      throw new Error('Socket.IO not initialized');
    }
    return this.io;
  }
}

module.exports = new SocketManager();