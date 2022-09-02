import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { checksExistsApiKey } from "./companies.svcs.js";
import { checksExistsEmployee } from "./employees.svcs.js";

import * as cardRepository from "../repositories/cardRepository.js";
import * as cryptrService from "./cryptr.svcs.js";

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
  }

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
  console.log({cvvNumber});
  const encryptedCvvNumber = cryptrService.encrypt(cvvNumber);
  return encryptedCvvNumber;
}
