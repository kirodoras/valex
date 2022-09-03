import { Router, Request, Response } from "express";
import * as rechargesController from "../controllers/recharges.controller.js";
import * as schemaValidator from "../middlewares/schemaValidator.middleware.js";
import rechargeSchema from "../schema/rechargeCard.schema.js";
import apiKeySchema from "../schema/apiKey.schema.js";

const rechargesRouter = Router();
const PATH = "/recharges";

rechargesRouter.post(
  `${PATH}`,
  schemaValidator.validateBody(rechargeSchema),
  schemaValidator.validateApiKey(apiKeySchema),
  rechargesController.rechargeCard
);

export default rechargesRouter;
