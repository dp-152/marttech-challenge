import { getRequestBody } from "../util/request-utils";

import { RoomInboundDto, RoomOutboundDto } from "../dtos/room";
import { IncomingMessage, ServerResponse } from "http";
import RoomController from "../controllers/room";

/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function roomEndpoints(
  req: IncomingMessage,
  res: ServerResponse,
  controller: RoomController,
) {
  // GET /api/rooms
  if (req.url === "/api/rooms" && req.method === "GET") {
    const rooms = await controller.allRooms();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rooms));
  }

  // GET /api/room/{id}
  else if (
    req.url &&
    req.url.match(/^\/api\/room\/[0-9]+$/) &&
    req.method === "GET"
  ) {
    try {
      const roomID = +req.url.match(/\/([0-9]+)$/)![1];
      const messages = await controller.messagesInRoom(roomID);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(messages));
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
  }

  // POST /api/room/new
  else if (req.url === "/api/room/new" && req.method === "POST") {
    const reqBodyBuffer = await getRequestBody(req);
    let createdRoom: RoomOutboundDto;

    try {
      const jsonObject = JSON.parse(reqBodyBuffer.toString());
      const newRoom = new RoomInboundDto({ ...jsonObject });
      createdRoom = await controller.createRoom(newRoom);
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
      return;
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(createdRoom));
  }

  // PUT /api/room/rename/{id}
  else if (
    req.url &&
    req.url.match(/^\/api\/room\/rename\/[0-9]+$/) &&
    req.method === "PUT"
  ) {
    const roomID = +req.url.match(/\/([0-9]+)$/)![1];
    const reqBodyBuffer = await getRequestBody(req);
    let renamedRoom: RoomOutboundDto;

    try {
      const jsonObject = JSON.parse(reqBodyBuffer.toString());
      const newName = jsonObject.name;
      renamedRoom = await controller.renameRoom(roomID, newName);
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
      return;
    }

    res.writeHead(203, { "Content-Type": "application/json" });
    res.end(JSON.stringify(renamedRoom));
  }
}
