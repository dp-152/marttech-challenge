import { Socket } from "socket.io";
import { SocketEvents } from "../types/socketEvents";
import IUserRepo from "../repositories/IUserRepo";
import IRoomRepo from "../repositories/IRoomRepo";

export default class SocketHandler {
  userRepo: IUserRepo;
  roomRepo: IRoomRepo;
  tracker: [];

  constructor(userRepo: IUserRepo, roomRepo: IRoomRepo) {
    this.userRepo = userRepo;
    this.roomRepo = roomRepo;
  }

  handler(socket: Socket) {
    socket.on(SocketEvents.auth, ({ username, password }) => {
      try {
        const user = this.userRepo.getByUsername(username);
        if (!user) {
          socket.emit("error", { message: "User not found" });
          return;
        }
        if (user.password !== password) {
          socket.emit("error", { message: "Wrong password" });
          return;
        }
        this.tracker.push({ id: socket.id, user: user.id });
      } catch (err) {
        console.log(err);
      }
    });
  }
}
