import IRoomRepo from "./IRoomRepo";
import Room from "../data/room";
import Message from "../data/message";

class MemoryRoomRepo implements IRoomRepo {
  private rooms: Room[] = [] as Room[];
  private currentID = 0;

  create(room: Room): Room {
    room.id = ++this.currentID;
    this.rooms.push(room);
    return room;
  }

  rename(id: number, newName: string): Room | null {
    const existingRoom = this.rooms.find(el => el.id === id);
    if (!existingRoom) {
      return null;
    }

    existingRoom.name = newName;
    return existingRoom;
  }

  getMessages(id: number): Message[] | null {
    const existingRoom = this.rooms.find(el => el.id === id);
    if (!existingRoom) {
      return null;
    }

    return existingRoom.messages;
  }

  pushMessage(message: Message): Message {
    const existingRoom = this.rooms.find(el => el.id === message.roomId);

    existingRoom!.messages.push(message);
    message.room = existingRoom!;

    return message;
  }
}

export default MemoryRoomRepo;
