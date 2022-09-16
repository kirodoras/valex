import * as cardsService from "./cardsService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as businessService from "./businessesService.js";

const dateFormat = "MM/YY";

export async function paymentAtPos(
  amount: number,
  cardId: number,
  password: string,
  businessId: number
) {
  const card = await cardsService.checkExistsCard(cardId);
  cardsService.checkActiveCard(card);
  cardsService.checkExpiredDate(card.expirationDate, dateFormat);
  if (card.isBlocked) {
    throw { type: "conflict", message: "Card blocked" };
  }
  cardsService.validatePassword(password, card);
  const business = await businessService.checkBusinessExists(businessId);
  if (card.type !== business.type) {
    throw {
      type: "conflict",
      message: "Card type not compatible with business type",
    };
  }
  const { balance } = await cardsService.balanceCard(cardId);
  if (balance < amount) {
    throw {
      type: "conflict",
      message: "Insufficient balance",
    };
  }
  const paymentData = {
    cardId,
    amount,
    businessId,
  };
  await paymentRepository.insert(paymentData);
}
