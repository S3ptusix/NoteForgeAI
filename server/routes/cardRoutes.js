import express from 'express';
import { addCardController, deleteCardController, editCardController, fetchAllCardController, fetchOneCardController } from '../controllers/cardControllers.js';

const cardRouter = express.Router();

// ADD CARD
cardRouter.post('/add', addCardController);

// FETCH ALL CARD
cardRouter.get('/fetchAll/:deckId', fetchAllCardController);

// FETCH ONE CARD
cardRouter.get('/fetch/:cardId', fetchOneCardController);

// DELETE CARD
cardRouter.delete('/delete/:cardId', deleteCardController);

// EDIT CARD
cardRouter.put('/edit', editCardController);

export default cardRouter;