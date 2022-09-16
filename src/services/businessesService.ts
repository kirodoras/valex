import * as businessRepository from "../repositories/businessRepository.js";

export async function checkBusinessExists(businessId: number) {
  const business = await businessRepository.findById(businessId);
  if (!business) throw { type: "not_found", message: "Business not found" };
  return business;
}
