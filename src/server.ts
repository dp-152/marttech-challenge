import http from "http";

import userEndpoints from "./endpoints/user";

const PORT = process.env.PORT || 5000;

/* eslint-disable brace-style */
const server = http.createServer(async (req, res) => {
  await userEndpoints(req, res);

  // CATCH-ALL
  if (!res.writableFinished) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
