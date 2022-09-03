import { Router, Request, Response } from "express";
import * as paymentsController from "../controllers/payments.controller.js";
import * as schemaValidator from "../middlewares/schemaValidator.middleware.js";
import paymentAtPosSchema from "../schema/paymentAtPos.schema.js";
const paymentsRouter = Router();
const PATH = "/payments";

paymentsRouter.post(
  `${PATH}/pos`,
  schemaValidator.validateBody(paymentAtPosSchema),
  paymentsController.paymentAtPos
);

export default paymentsRouter;
