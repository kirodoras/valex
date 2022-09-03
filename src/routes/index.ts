import { Router, Request, Response } from "express";
import CardRouter from "./cards.router.js";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(CardRouter);

export default router;
