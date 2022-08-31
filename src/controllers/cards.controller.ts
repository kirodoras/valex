import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
    const {employeeId, cardType} = req.body;
    const apiKey = req.header('x-api-key');

    console.log({employeeId});
    console.log({cardType});
    console.log({apiKey});
    res.sendStatus(201);
}