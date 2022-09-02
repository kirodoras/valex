import { Request, Response } from "express";
import * as cardsService from "../services/cards.svcs.js";

export async function createCard(req: Request, res: Response) {
    const {employeeId, cardType} = req.body;
    const apiKey = req.header('x-api-key');
    
    await cardsService.createCard(apiKey, employeeId, cardType);

    console.log({employeeId});
    console.log({cardType});
    console.log({apiKey});
    res.sendStatus(201);
}