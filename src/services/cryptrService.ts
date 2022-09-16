import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export function encrypt(value: string) {
  const encryptedString = cryptr.encrypt(value);
  return encryptedString;
}

export function decrypt(value: string) {
  const decryptedString = cryptr.decrypt(value);
  return decryptedString;
}
