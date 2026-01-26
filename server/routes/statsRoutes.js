import express from 'express';
import { authenticateUserJWT } from '../middleware/auth.js';
import { countDeckQuizReviewerController } from '../controllers/statsControllers.js';

const statsRouter = express.Router();

// COUNT DECK, QUIZ AND REVIEWER
statsRouter.get('/countDeckQuizReviewer', authenticateUserJWT, countDeckQuizReviewerController);

export default statsRouter;