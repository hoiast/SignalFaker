import Router from "koa-router";
import SignalController from "../../controllers/api/signalController";

const router = new Router();
const signalController = new SignalController();

/**
 * Respond a fake signal at the current time or at a specific time.
 * If a specific time value is provided but is not a valid, it will default to use current time.
 */
router.get("/", async (ctx, next) => {
  const { time } = ctx.query;
  const numericTime = Number(time);

  // . If there is no valid time input, default to current time
  const data = signalController.isTimeInputValid(numericTime)
    ? signalController.getSignalAtTime(numericTime)
    : signalController.getSignal();
  ctx.body = data;
  await next();
});

export default router.routes();
