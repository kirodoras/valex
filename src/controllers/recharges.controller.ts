import { Request, Response } from "express";
import * as rechargesService from "../services/recharges.svcs.js";

export async function rechargeCard(req: Request, res: Response) {
  const { amount, cardId } = req.body;
  const apiKey = req.header("x-api-key");
  await rechargesService.rechargeCard(amount, cardId, apiKey);
  res.sendStatus(201);
}
