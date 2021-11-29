import { IncomingMessage } from "http";

export function getRequestBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((res, rej) => {
    const reqBody = [] as Buffer[];

    try {
      req.on("data", (chunk: Buffer) => {
        reqBody.push(chunk);
      });

      req.on("end", () => {
        res(Buffer.concat(reqBody));
      });
    } catch (err) {
      rej(err);
    }
  });
}
