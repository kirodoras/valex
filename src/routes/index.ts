import { Router, Request, Response } from "express";
import CardRouter from "./cardsRouter.js";
import RechargesRouter from "./rechargesRouter.js";
import PaymentsRouter from "./paymentsRouter.js";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(CardRouter);
router.use(RechargesRouter);
router.use(PaymentsRouter);
export default router;
