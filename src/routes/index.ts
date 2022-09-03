import { Router, Request, Response } from "express";
import CardRouter from "./cards.router.js";
import RechargesRouter from "./recharges.router.js";
import PaymentsRouter from "./payments.router.js";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(CardRouter);
router.use(RechargesRouter);
router.use(PaymentsRouter);
export default router;
