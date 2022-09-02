import { checksExistsApiKey } from "./companies.svcs.js";

import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(
  apiKey: string,
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  await checksExistsApiKey(apiKey);
}
