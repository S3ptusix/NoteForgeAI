import express from 'express';
import { addQuizController, deleteQuizController, fetchAllQuizController } from '../controllers/quizController.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const quizRouter = express.Router();

// ADD DECK
quizRouter.post('/add', authenticateUserJWT, addQuizController);

// FETCH ALL DECK
quizRouter.get('/fetchAll', authenticateUserJWT, fetchAllQuizController);

// DELETE DECK
quizRouter.delete('/delete/:quizId', deleteQuizController);

export default quizRouter;