import { Request, Response } from "express";
import * as paymentsService from "../services/paymentsService.js";

export async function paymentAtPos(req: Request, res: Response) {
  const { amout, cardId, password, businessId } = req.body;
  await paymentsService.paymentAtPos(amout, cardId, password, businessId);
  res.sendStatus(201);
}
