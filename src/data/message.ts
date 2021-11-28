import Room from "./room";
import User from "./user";

class Message {
  id: number = -1;
  roomId: number = -1;
  room: Room = {} as Room;
  senderId: number = -1;
  sender: User = {} as User;
  timestamp: Date = {} as Date;
  body: string = "";

  constructor(init: Message) {
    Object.assign(this, init);
  }
}

export default Message;
