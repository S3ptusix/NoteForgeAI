import express from 'express';
import { addCardController, fetchAllCardController } from '../controllers/cardControllers.js';

const cardRouter = express.Router();

// ADD CARD
cardRouter.post('/add', addCardController);

// FETCH ALL CARD
cardRouter.get('/fetchAll/:deckId', fetchAllCardController);

export default cardRouter;