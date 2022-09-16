import joi from "joi";

const apiKeySchema = joi.string().required();

export default apiKeySchema;
