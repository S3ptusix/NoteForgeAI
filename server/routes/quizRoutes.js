import express from 'express';
import { addQuizController } from '../controllers/quizController.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const quizRouter = express.Router();

// ADD DECK
quizRouter.post('/add', authenticateUserJWT, addQuizController);

export default quizRouter;