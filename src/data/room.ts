import Message from "./message";

class Room {
  id: number = -1;
  name: string = "";
  messages: Message[] = [] as Message[];

  constructor(init: Partial<Room>) {
    Object.assign(this, init);
  }
}

export default Room;
