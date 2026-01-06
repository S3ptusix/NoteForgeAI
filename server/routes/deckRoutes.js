import express from 'express';
import { addDeckController, deleteDeckController, fetchAllDeckController } from '../controllers/deckControllers.js';

const deckRouter = express.Router();

// ADD DECK
deckRouter.post('/add', addDeckController);

// FETCH ALL DECK
deckRouter.get('/fetchAll', fetchAllDeckController);

// DELETE DECK
deckRouter.delete('/delete/:deckId', deleteDeckController);

export default deckRouter;