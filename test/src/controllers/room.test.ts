import RoomController from "../../../src/controllers/room";
import { RoomInboundDto, RoomOutboundDto } from "../../../src/dtos/room";
import MemoryRoomRepo from "../../../src/repositories/MemoryRoomRepo";

async function createRoom(): Promise<[RoomInboundDto, RoomOutboundDto]> {
  const testRoom = new RoomInboundDto({
    name: "NewRoom",
  });
  const returnedRoom = await subject.createRoom(testRoom);

  return [testRoom, returnedRoom];
}

let subject: RoomController;

beforeAll(() => {
  subject = new RoomController(new MemoryRoomRepo());
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

test("Returns an error for empty required fields", async () => {
  const roomWithoutName = new RoomInboundDto({ name: "" });
  await expect(subject.createRoom(roomWithoutName)).rejects.toThrow();
  const [, newRoom] = await createRoom();
  await expect(subject.renameRoom(newRoom.id, "")).rejects.toThrow();
});

test("Returns no messages on an empty room", async () => {
  const roomWithoutMessages = new RoomInboundDto({ name: "room" });
  const [, newRoom] = await createRoom();
  const messages = await subject.messagesInRoom(newRoom.id);
  expect(messages).toHaveLength(0);
});
