require("dotenv").config();

const { app, server } = require("./app.js");

const { User } = require("./models");

const express = require("express");
const mongoose = require("mongoose");
// const io = require("socket.io")(server, { cors: { origin: true } });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error.middleware");

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//     res.io = io;
//     next();
// });

app.use("/api/auth", require("./routers/auth.router"));
app.use("/api/users", require("./routers/users.router"));
app.use("/api/rooms", require("./routers/rooms.router"));
app.use("/api/file", require("./routers/file.router"));
app.use("/api/messages", require("./routers/message.router"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

// io.on("connection", (socket) => {
//     //socket.join(11);

//     // socket.on("hello", (data) => {
//     //     console.log(data);
//     //     socket.emit("privet", { message: "hello lalka" });
//     // });

//     // socket.on("ROOM:message", (data) => {
//     //     console.log(data);
//     //     io.emit("ROOM:message", `пришло новое СООБЩЕНИЕ: ${data}`);
//     // });

//     socket.on("ROOMS/JOIN_USER", (data) => {
//         socket.broadcast.emit("ROOMS/JOIN_USER", data);
//     });
// });

module.exports = { server };
