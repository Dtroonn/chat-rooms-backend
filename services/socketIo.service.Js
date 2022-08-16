const { server } = require("../app");
const io = require("socket.io");

class SocketIoService {
    constructor() {
        this.io = io(server, { cors: { origin: true } });

        this.io.on("connection", this.onConnection.bind(this));
    }

    onConnection(socket) {
        this.onRoomJoinUser(socket);
    }

    onRoomJoinUser(socket) {
        socket.on("ROOM/JOIN_USER", (roomId) => {
            socket.join(roomId);
        });
    }

    emitMessageToRoom(roomId, message) {
        this.io.to(roomId).emit("ROOM/NEW_MESSAGE", message);
    }
}

module.exports = new SocketIoService();
