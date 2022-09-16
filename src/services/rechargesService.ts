import * as cardsService from "./cardsService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { checksExistsApiKey } from "./companiesService.js";
import * as cardRepository from "../repositories/cardRepository.js";
const dateFormat = "MM/YY";

export async function rechargeCard(
  amount: number,
  cardId: number,
  apiKey: string
) {
  await checksExistsApiKey(apiKey);
  const card = await cardsService.checkExistsCard(cardId);
  cardsService.checkActiveCard(card);
  cardsService.checkExpiredDate(card.expirationDate, dateFormat);
  await rechargeRepository.insert({ cardId, amount });
}
