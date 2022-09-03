import * as cardsService from "../services/cards.svcs.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { checksExistsApiKey } from "./companies.svcs.js";
import * as cardRepository from "../repositories/cardRepository.js";
const dateFormat = "MM/YY";

export async function rechargeCard(
  amount: number,
  cardId: number,
  apiKey: string
) {
  console.log({ amount, cardId, apiKey });
  await checksExistsApiKey(apiKey);
  const card = await cardsService.checkExistsCard(cardId);
  checkActiveCard(card);
  cardsService.checkExpiredDate(card.expirationDate, dateFormat);
  await rechargeRepository.insert({ cardId, amount });
}

export function checkActiveCard(card: cardRepository.Card) {
  if (card.password === null) {
    throw { type: "conflict", message: "Card is not active" };
  }
}
