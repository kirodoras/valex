import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { message } = error.details[0];
      throw { type: "unprocessable_entity", message };
    }
    next();
  };
}

export function validateApiKey(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header("x-api-key");
    const { error } = schema.validate(apiKey);
    if (error) {
      const message: string = "Invalid API key";
      throw { type: "unprocessable_entity", message };
    }
    next();
  };
}
