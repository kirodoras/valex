import { Router } from "express";
import * as cardsController from "../controllers/cards.controller.js";
import * as schemaValidator from "../middlewares/schemaValidator.middleware.js";
import createCardSchema from "../schema/createCard.schema.js";
import apiKeySchema from "../schema/apiKey.schema.js";

const CardRouter = Router();
const PATH = "/cards";

CardRouter.post(
  `${PATH}`,
  schemaValidator.validateBody(createCardSchema),
  schemaValidator.validateApiKey(apiKeySchema),
  cardsController.createCard
);

export default CardRouter;
