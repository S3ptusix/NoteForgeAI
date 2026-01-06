import express from 'express';
import { addDeckController, fetchAllDeckController } from '../controllers/deckControllers.js';

const deckRouter = express.Router();

// ADD DECK
deckRouter.post('/add', addDeckController);

// FETCH ALL DECK
deckRouter.get('/fetchAll', fetchAllDeckController);

export default deckRouter;