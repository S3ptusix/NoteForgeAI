import express from 'express';
import { generateFlashcardController, generateQuizController, generateReviewerController } from '../controllers/generateControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const generateRouter = express.Router();

// GENERATE FLASHCARD
generateRouter.post('/flashcard', authenticateUserJWT, generateFlashcardController);

// GENERATE QUIZ
generateRouter.post('/quiz', authenticateUserJWT, generateQuizController);

// GENERATE REVIEWER
generateRouter.post('/reviewer', authenticateUserJWT, generateReviewerController);

export default generateRouter;