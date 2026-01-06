import express from 'express';
import { addCardController } from '../controllers/cardControllers.js';

const cardRouter = express.Router();

// ADD DECK
cardRouter.post('/add', addCardController);

export default cardRouter;