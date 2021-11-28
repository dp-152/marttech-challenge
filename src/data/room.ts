import Message from "./message";

class Room {
  id: number = -1;
  name: string = "";
  messages: Message[] = [] as Message[];

  constructor(init: Room) {
    Object.assign(this, init);
  }
}

export default Room;
