import { getRequestBody } from "../util/request-utils";

import * as userController from "../controllers/user";
import MemoryUserRepo from "../repositories/MemoryUserRepo";
import { UserInboundDto, UserOutboundDto } from "../dtos/user";
import { IncomingMessage, ServerResponse } from "http";

userController.init(new MemoryUserRepo());

/* eslint-disable brace-style */
export default async function userEndpoints(
  req: IncomingMessage,
  res: ServerResponse,
) {
  // GET /api/user/{id}
  if (
    req.url &&
    req.url.match(/^\/api\/user\/[0-9]+$/) &&
    req.method === "GET"
  ) {
    try {
      const id = +req.url.match(/\/([0-9]+)$/)![1];
      const user = await userController.userById(id);

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
      createdUser = await userController.newUser(newUser);
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
      return;
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(createdUser));
  }
}
