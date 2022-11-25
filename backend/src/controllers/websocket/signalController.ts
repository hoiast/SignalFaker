import type WebSocket from "ws";
import SignalFakerWrapper from "../../services/SignalFaker/WebsocketWrapper";

export default (websocket: WebSocket) => {
  const signalFakerWrapper = new SignalFakerWrapper(websocket);

  websocket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      const { type, payload } = parsedMessage;

      if (type === "setInterval") {
        if (payload && payload.interval) {
          signalFakerWrapper.setInterval(payload);
        }
      } else if (type === "start") {
        signalFakerWrapper.startContinuousFakeSignal();
      } else if (type === "stop") {
        signalFakerWrapper.stopContinuousFakeSignal();
      } else if (type === "restart") {
        signalFakerWrapper.resetTimeAndRestartContinuousFakeSignal();
      }
    } catch (error: unknown) {
      console.error(error);
    }
  });
};
