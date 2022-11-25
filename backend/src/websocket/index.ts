import websockify from "koa-websocket";
import signalController from "../controllers/websocket/signalController";

export default (server: websockify.App) => {
  server.ws.use(function (ctx, next) {
    // . Add Controllers here
    const controllers = [signalController];
    controllers.forEach((controller) => controller(ctx.websocket));

    return next();
  });
};
