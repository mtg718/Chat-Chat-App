const io = require("socket.io")(7000);
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
  
    users[socket.id] = name;
    //notify everyone that new user(name) joined the chat except the one who joined
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    //notify everyone the new message sent
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});