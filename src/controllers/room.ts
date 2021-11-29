import { MessageOutboundDto } from "../dtos/message";
import Room from "../data/room";
import { RoomInboundDto, RoomOutboundDto } from "../dtos/room";
import IRoomRepo from "../repositories/IRoomRepo";

let roomRepo: IRoomRepo;

export function init(repo: IRoomRepo) {
  roomRepo = repo;
}

export function allRooms(): Promise<RoomOutboundDto[]> {
  return new Promise(res => {
    res(roomRepo.getAll().map(el => new RoomOutboundDto({ ...el })));
  });
}

export function createRoom(newRoom: RoomInboundDto): Promise<RoomOutboundDto> {
  return new Promise(res => {
    const mappedRoom = new Room({ ...newRoom, id: -1 });
    const returnedRoom = roomRepo.create(mappedRoom);
    res(returnedRoom);
  });
}

export function renameRoom(
  id: number,
  newName: string,
): Promise<RoomOutboundDto> {
  return new Promise((res, rej) => {
    const returnedRoom = roomRepo.rename(id, newName);
    if (!returnedRoom) {
      rej(new Error("Room not found"));
    }

    res(returnedRoom!);
  });
}

export function messagesInRoom(id: number): Promise<MessageOutboundDto[]> {
  return new Promise((res, rej) => {
    const foundMessages = roomRepo.getMessages(id);
    if (!foundMessages) {
      rej(new Error("Room not found"));
    }

    res(foundMessages!.map(el => new MessageOutboundDto({ ...el })));
  });
}
