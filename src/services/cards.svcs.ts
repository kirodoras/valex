import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { checksExistsApiKey } from "./companies.svcs.js";
import { checksExistsEmployee } from "./employees.svcs.js";

import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cryptrService from "./cryptr.svcs.js";
import * as bcryptService from "./bcrypt.svcs.js";

const paymentProcessing: string = "mastercard";
const yearsToAdd: number = 5;
const dateFormat = "MM/YY";

export async function createCard(
  apiKey: string,
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  await checksExistsApiKey(apiKey);
  const employee = await checksExistsEmployee(employeeId);
  await checksExistsEmployeeCard(employeeId, cardType);

  const cardNumber = generateCardNumber(paymentProcessing);
  const formattedName = formatEmployeeName(employee.fullName);
  const expirationDate = generateExpirationDate(yearsToAdd, dateFormat);
  const securityCode = generateSecurityCode();

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName: formattedName,
    securityCode,
    expirationDate,
    isVirtual: false,
    isBlocked: true,
    type: cardType,
  };

  await cardRepository.insert(cardData);
}

export async function checksExistsEmployeeCard(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const card = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );
  if (card)
    throw {
      type: "conflict",
      message: "The employee already has this type of card",
    };
}

export function generateCardNumber(paymentProcessing: string) {
  const cardNumber: string = faker.finance.creditCardNumber(paymentProcessing);
  return cardNumber;
}

export function formatEmployeeName(name: string) {
  const splitName = name.split(" ");
  const filterName = splitName.filter((value) => value.length > 2);
  const firstName = filterName[0];
  const lastName = filterName[filterName.length - 1];
  let initials = "";
  if (filterName.length > 2) {
    for (let i = 1; i < filterName.length - 1; i++) {
      initials += `${filterName[i][0]} `;
    }
  }
  const formattedName = `${firstName} ${initials}${lastName}`.toUpperCase();
  return formattedName;
}

export function generateExpirationDate(yearsToAdd: number, dateFormat: string) {
  const expirationDate = dayjs().add(yearsToAdd, "year").format(dateFormat);
  return expirationDate;
}

export function generateSecurityCode() {
  const cvvNumber: string = faker.finance.creditCardCVV();
  console.log({ cvvNumber });
  const encryptedCvvNumber = cryptrService.encrypt(cvvNumber);
  return encryptedCvvNumber;
}

/*--------*/
export async function activateCard(
  cardId: number,
  cvv: string,
  password: string
) {
  const card = await checkExistsCard(cardId);
  checkActiveCard(card);
  validateSecurityCode(cvv, card.securityCode);
  checkExpiredDate(card.expirationDate, dateFormat);
  const encodePassword: string = await bcryptService.encode(password);
  await cardRepository.update(cardId, {
    password: encodePassword,
    isBlocked: false,
  });
}

export async function checkExistsCard(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) throw { type: "not_found", message: "Card not found" };
  return card;
}

export function checkExpiredDate(expirationDate: string, dateFormat: string) {
  const currentDate = dayjs().format(dateFormat);
  const isExpired = dayjs(expirationDate).isBefore(currentDate);
  if (isExpired) {
    throw { type: "conflict", message: "Card is expired" };
  }
}

export function validateSecurityCode(cvv: string, securityCode: string) {
  const decryptedCvv = cryptrService.decrypt(securityCode);
  if (decryptedCvv !== cvv)
    throw { type: "unauthorized", message: "Invalid CVV" };
}

export function checkActiveCard(card: cardRepository.Card) {
  if (card.password !== null)
    throw { type: "conflict", message: "Card already activate" };
}

/*--------*/
export async function balanceCard(cardId: number) {
  const card = await checkExistsCard(cardId);
  const transactions = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const totalPayments = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalRecharges = recharges.reduce(
    (sum, recharge) => sum + recharge.amount,
    0
  );
  const balance = totalRecharges - totalPayments;

  return { balance, transactions, recharges };
}

/*--------*/
export async function blockCard(cardId: number, password: string) {
  const card = await checkExistsCard(cardId);
  checkExpiredDate(card.expirationDate, dateFormat);
  if (card.isBlocked) {
    throw { type: "conflict", message: "Card already blocked" };
  }
  validatePassword(password, card);
  await cardRepository.update(cardId, { isBlocked: true });
}

export async function unblockCard(cardId: number, password: string) {
    const card = await checkExistsCard(cardId);
    checkExpiredDate(card.expirationDate, dateFormat);
    if (!card.isBlocked) {
      throw { type: "conflict", message: "Card already unblocked" };
    }
    validatePassword(password, card);
    await cardRepository.update(cardId, { isBlocked: false });
  }

export async function validatePassword(
  password: string,
  card: cardRepository.Card
) {
  const isPasswordValid = bcryptService.verify(password, card.password);
  if (!isPasswordValid) {
    throw { type: "unauthorized", message: "Invalid password" };
  }
}
