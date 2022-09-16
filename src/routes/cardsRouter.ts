import { Router } from "express";
import * as cardsController from "../controllers/cardsController.js";
import * as schemaValidator from "../middlewares/schemaValidatorMiddleware.js";
import createCardSchema from "../schema/createCardSchema.js";
import apiKeySchema from "../schema/apiKeySchema.js";
import activateCardSchema from "../schema/activateCardSchema.js";
import balanceCardSchema from "../schema/balanceCardSchema.js";
import blockAndUnblockSchema from "../schema/blockAndUnblockSchema.js";

const CardRouter = Router();
const PATH = "/cards";

CardRouter.post(
  `${PATH}/create`,
  schemaValidator.validateBody(createCardSchema),
  schemaValidator.validateApiKey(apiKeySchema),
  cardsController.createCard
);

CardRouter.patch(
  `${PATH}/activate`,
  schemaValidator.validateBody(activateCardSchema),
  cardsController.activateCard
);

CardRouter.get(
  `${PATH}/balance`,
  schemaValidator.validateBody(balanceCardSchema),
  cardsController.balanceCard
);

CardRouter.patch(
  `${PATH}/block`,
  schemaValidator.validateBody(blockAndUnblockSchema),
  cardsController.blockCard
);

CardRouter.patch(
  `${PATH}/unblock`,
  schemaValidator.validateBody(blockAndUnblockSchema),
  cardsController.unblockCard
);

export default CardRouter;
