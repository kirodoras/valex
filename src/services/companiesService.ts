import * as companyRepository from "../repositories/companyRepository.js";

export async function checksExistsApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) throw { type: "unauthorized", message: "Invalid ApiKey" };
}
