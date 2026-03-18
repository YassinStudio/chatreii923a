const WebSocket = require("ws");
const port = process.env.PORT || 10000;
const server = new WebSocket.Server({ port });

const users = new Map();

server.on("connection", socket => {
  const id = Math.floor(Math.random() * 1000000);
  users.set(socket, id);

  socket.on("message", message => {
    // broadcast to all connected clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    users.delete(socket);
  });
});

console.log("Server running on port " + port);
