import { Request, Response } from "express";
import * as cardsService from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;
  const apiKey = req.header("x-api-key");

  await cardsService.createCard(apiKey, employeeId, cardType);

  res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
  const { cardId, cvv, password } = req.body;

  await cardsService.activateCard(cardId, cvv, password);

  res.sendStatus(202);
}

export async function balanceCard(req: Request, res: Response) {
  const { id } = req.body;
  const cardInfos = await cardsService.balanceCard(id);
  res.status(200).send(cardInfos);
}

export async function blockCard(req: Request, res: Response) {
  const { id, password } = req.body;
  await cardsService.blockCard(id, password);
  res.sendStatus(202);
}

export async function unblockCard(req: Request, res: Response) {
  const { id, password } = req.body;
  await cardsService.unblockCard(id, password);
  res.sendStatus(202);
}
