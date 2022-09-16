import joi from "joi";

const rechargeSchema = joi.object({
  amount: joi.number().greater(0).required(),
  cardId: joi.number().min(1).required(),
});

export default rechargeSchema;
