import { MessageOutboundDto } from "../dtos/message";
import Room from "../data/room";
import { RoomInboundDto, RoomOutboundDto } from "../dtos/room";
import IRoomRepo from "../repositories/IRoomRepo";

export default class RoomController {
  roomRepo: IRoomRepo;

  constructor(repo: IRoomRepo) {
    this.roomRepo = repo;
  }

  allRooms(): Promise<RoomOutboundDto[]> {
    return new Promise(res => {
      res(this.roomRepo.getAll().map(el => new RoomOutboundDto({ ...el })));
    });
  }

  createRoom(newRoom: RoomInboundDto): Promise<RoomOutboundDto> {
    return new Promise((res, rej) => {
      if (!newRoom.name || newRoom.name === "") {
        rej(new Error("One or more required fields are empty"));
        return;
      }
      const mappedRoom = new Room({ ...newRoom, id: -1 });

      const returnedRoom = this.roomRepo.create(mappedRoom);
      res(returnedRoom);
    });
  }

  renameRoom(id: number, newName: string): Promise<RoomOutboundDto> {
    return new Promise((res, rej) => {
      if (newName === "") {
        rej(new Error("One or more required fields are empty"));
        return;
      }
      const returnedRoom = this.roomRepo.rename(id, newName);
      if (!returnedRoom) {
        rej(new Error("Room not found"));
        return;
      }

      res(returnedRoom!);
    });
  }

  messagesInRoom(id: number): Promise<MessageOutboundDto[]> {
    return new Promise((res, rej) => {
      const foundMessages = this.roomRepo.getMessages(id);
      if (!foundMessages) {
        rej(new Error("Room not found"));
        return;
      }

      res(foundMessages!.map(el => new MessageOutboundDto({ ...el })));
    });
  }
}
