import { Router, Request, Response } from "express";
import * as rechargesController from "../controllers/rechargesController.js";
import * as schemaValidator from "../middlewares/schemaValidatorMiddleware.js";
import rechargeSchema from "../schema/rechargeCardSchema.js";
import apiKeySchema from "../schema/apiKeySchema.js";

const rechargesRouter = Router();
const PATH = "/recharges";

rechargesRouter.post(
  `${PATH}`,
  schemaValidator.validateBody(rechargeSchema),
  schemaValidator.validateApiKey(apiKeySchema),
  rechargesController.rechargeCard
);

export default rechargesRouter;
