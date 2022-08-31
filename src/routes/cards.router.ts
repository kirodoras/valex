import { Router } from 'express';
import * as cardsController from '../controllers/cards.controller.js';

const CardRouter = Router();
const PATH = '/cards';

CardRouter.post(`${PATH}`, cardsController.createCard);

export default CardRouter;