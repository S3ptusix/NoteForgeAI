import express from 'express';
import { generateFlashcardController, generateQuizController } from '../controllers/generateControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const generateRouter = express.Router();

// GENERATE FLASHCARD
generateRouter.post('/flashcard', authenticateUserJWT, generateFlashcardController);

// GENERATE QUIZ
generateRouter.post('/quiz', authenticateUserJWT, generateQuizController);

export default generateRouter;