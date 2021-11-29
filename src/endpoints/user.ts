import { getRequestBody } from "../util/request-utils";


import { UserInboundDto, UserOutboundDto } from "../dtos/user";
import { IncomingMessage, ServerResponse } from "http";
import UserController from "../controllers/user";

/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function userEndpoints(
  req: IncomingMessage,
  res: ServerResponse,
  controller: UserController,
) {
  // GET /api/user/{id}
  if (
    req.url &&
    req.url.match(/^\/api\/user\/[0-9]+$/) &&
    req.method === "GET"
  ) {
    try {
      const id = +req.url.match(/\/([0-9]+)$/)![1];
      const user = await controller.userById(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
  }

  // POST /api/user/new
  else if (req.url === "/api/user/new" && req.method === "POST") {
    const reqBodyBuffer = await getRequestBody(req);
    let createdUser: UserOutboundDto;

    try {
      const jsonObject = JSON.parse(reqBodyBuffer.toString());
      const newUser = new UserInboundDto({ ...jsonObject });
      createdUser = await controller.newUser(newUser);
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
      return;
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(createdUser));
  }
}
