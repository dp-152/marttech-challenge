import http from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

import UserController from "./controllers/user";
import RoomController from "./controllers/room";
import MemoryUserRepo from "./repositories/MemoryUserRepo";
import MemoryRoomRepo from "./repositories/MemoryRoomRepo";

import userEndpoints from "./endpoints/user";
import roomEndpoints from "./endpoints/room";
import socketHandler from "./endpoints/socket";

const PORT = process.env.PORT || 5000;

const userRepo = new MemoryUserRepo();
const userController = new UserController(userRepo);

const roomRepo = new MemoryRoomRepo();
const roomController = new RoomController(roomRepo);

/* eslint-disable brace-style */
const server = http.createServer(async (req, res) => {
  if (!res.writableFinished) await userEndpoints(req, res, userController);
  if (!res.writableFinished) await roomEndpoints(req, res, roomController);

  // CATCH-ALL
  if (!res.writableFinished) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

const io = new SocketIoServer(server);
io.on("connection", socketHandler);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
