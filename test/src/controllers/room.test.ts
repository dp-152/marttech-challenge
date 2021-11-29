import * as subject from "../../../src/controllers/room";
import { RoomInboundDto, RoomOutboundDto } from "../../../src/dtos/room";
import MemoryRoomRepo from "../../../src/repositories/MemoryRoomRepo";

async function createRoom(): Promise<[RoomInboundDto, RoomOutboundDto]> {
  const testRoom = new RoomInboundDto({
    name: "NewRoom",
  });
  const returnedRoom = await subject.createRoom(testRoom);

  return [testRoom, returnedRoom];
}

beforeAll(() => {
  subject.init(new MemoryRoomRepo());
});

test("Returns no rooms", async () => {
  expect(await subject.allRooms()).toMatchObject([]);
});

test("Creates a room", async () => {
  const [testRoom, returnedRoom] = await createRoom();

  expect(returnedRoom.id).toBeDefined();
  expect(returnedRoom.name).toMatch(testRoom.name);
});

test("Renames a room", async () => {
  const [, room] = await createRoom();

  const newName = "New Name for the Room";
  const renamedRoom = await subject.renameRoom(room.id, newName);

  expect(renamedRoom.name).toMatch(newName);
});

test("Returns an error for invalid room ID", async () => {
  await expect(subject.messagesInRoom(2257)).rejects.toThrow();
  await expect(subject.renameRoom(2257, "crash")).rejects.toThrow();
});
