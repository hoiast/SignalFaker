import Router from "koa-router";
import signalRoutes from "./signalRoutes";

const router = new Router();

router.use("/signal", signalRoutes);

export default router.routes();
