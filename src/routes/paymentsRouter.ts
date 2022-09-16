import { Router, Request, Response } from "express";
import * as paymentsController from "../controllers/paymentsController.js";
import * as schemaValidator from "../middlewares/schemaValidatorMiddleware.js";
import paymentAtPosSchema from "../schema/paymentAtPosSchema.js";
const paymentsRouter = Router();
const PATH = "/payments";

paymentsRouter.post(
  `${PATH}/pos`,
  schemaValidator.validateBody(paymentAtPosSchema),
  paymentsController.paymentAtPos
);

export default paymentsRouter;
