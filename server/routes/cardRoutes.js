import express from 'express';
import { addCardController, deleteCardController, fetchAllCardController } from '../controllers/cardControllers.js';

const cardRouter = express.Router();

// ADD CARD
cardRouter.post('/add', addCardController);

// FETCH ALL CARD
cardRouter.get('/fetchAll/:deckId', fetchAllCardController);

// DELETE CARD
cardRouter.delete('/delete/:cardId', deleteCardController);

export default cardRouter;