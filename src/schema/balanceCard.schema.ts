import joi from "joi";

const balanceSchema = joi.object({
  id: joi.number().min(1).required(),
});

export default balanceSchema;
