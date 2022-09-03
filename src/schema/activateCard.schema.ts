import joi from "joi";

const activateCardSchema = joi.object({
    cardId: joi.number().min(1).required(),
    cvv: joi.string().trim().min(3).max(3).required(),
    password: joi.string().trim().min(4).max(4).required(),
});

export default activateCardSchema;