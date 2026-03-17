const socketIO = require('socket.io');

let io;

/**
 * Initializes and manages the Socket.io server instance.
 * By keeping it in a separate module, we can import `getIO` anywhere 
 * in our controllers or webhooks to emit real-time events.
 */
module.exports = {
  init: (server) => {
    io = socketIO(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    io.on('connection', (socket) => {
      console.log(`[Socket.io] Client connected: ${socket.id}`);

      // Client requests to join a specific campaign's telemetry room
      socket.on('joinCampaign', (campaignId) => {
        socket.join(campaignId);
        console.log(`[Socket.io] Client ${socket.id} joined campaign room: ${campaignId}`);
      });

      // Client requests to leave a specific campaign room
      socket.on('leaveCampaign', (campaignId) => {
        socket.leave(campaignId);
        console.log(`[Socket.io] Client ${socket.id} left campaign room: ${campaignId}`);
      });

      socket.on('disconnect', () => {
        console.log(`[Socket.io] Client disconnected: ${socket.id}`);
      });
    });

    return io;
  },

  // Retrieve the initialized io instance to emit events from other files
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io has not been initialized!');
    }
    return io;
  }
};