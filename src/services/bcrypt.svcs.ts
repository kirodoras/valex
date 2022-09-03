import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SALT_ROUNDS: number = +process.env.BCRYPT_SALT || 10;

export async function encode(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export function verify(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}