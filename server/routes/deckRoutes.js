import express from 'express';
import { addDeckController, deleteDeckController, editDeckController, fetchAllDeckController, fetchOneDeckController } from '../controllers/deckControllers.js';

const deckRouter = express.Router();

// ADD DECK
deckRouter.post('/add', addDeckController);

// FETCH ALL DECK
deckRouter.get('/fetchAll', fetchAllDeckController);

// FETCH ONE DECK
deckRouter.get('/fetch/:deckId', fetchOneDeckController);

// DELETE DECK
deckRouter.delete('/delete/:deckId', deleteDeckController);

// EDIT DECK
deckRouter.put('/edit', editDeckController);

export default deckRouter;