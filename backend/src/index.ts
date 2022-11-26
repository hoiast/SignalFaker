import Koa from "koa";
import json from "koa-json";
import logger from "koa-logger";
import websockify from "koa-websocket";
import cors from "@koa/cors";
import router from "./routes";
import websocketConfiguration from "./websocket";

const server = websockify(new Koa());

server.use(json());
server.use(logger());
server.use(cors());
server.use(router.routes());
server.use(router.allowedMethods());
websocketConfiguration(server);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Please visit http://localhost:${PORT}`
  );
});
