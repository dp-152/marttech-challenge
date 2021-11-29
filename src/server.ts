import http from "http";

import userEndpoints from "./endpoints/user";
import roomEndpoints from "./endpoints/room";

const PORT = process.env.PORT || 5000;

/* eslint-disable brace-style */
const server = http.createServer(async (req, res) => {
  if (!res.writableFinished) await userEndpoints(req, res);
  if (!res.writableFinished) await roomEndpoints(req, res);

  // CATCH-ALL
  if (!res.writableFinished) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
