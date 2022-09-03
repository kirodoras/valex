import joi from "joi";

const paymentAtPosSchema = joi.object({
  amout: joi.number().greater(0).required(),
  cardId: joi.number().min(1).required(),
  businessId: joi.number().min(1).required(),
  password: joi.string().min(4).max(4).required(),
});

export default paymentAtPosSchema;
