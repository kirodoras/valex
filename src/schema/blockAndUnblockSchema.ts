import joi from "joi";

const blockAndUnblockSchema = joi.object({
  id: joi.number().min(1).required(),
  password: joi.string().min(4).max(4).required(),
});

export default blockAndUnblockSchema;
