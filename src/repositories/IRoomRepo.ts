import Room from "../data/room";
import Message from "../data/message";

interface IRoomRepo {
  create: (room: Room) => Room;
  rename: (id: number, newName: string) => Room | null;
  getMessages: (id: number) => Message[] | null;
  pushMessage: (message: Message) => Message | null;
}

export default IRoomRepo;
