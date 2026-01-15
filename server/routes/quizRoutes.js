import express from 'express';
import { addQuizController, deleteQuizController, editQuizController, fetchAllQuizController, fetchOneQuizController } from '../controllers/quizController.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const quizRouter = express.Router();

// ADD QUIZ
quizRouter.post('/add', authenticateUserJWT, addQuizController);

// FETCH ALL QUIZ
quizRouter.get('/fetchAll', authenticateUserJWT, fetchAllQuizController);

// FETCH ONE QUIZ
quizRouter.get('/fetch/:quizId', fetchOneQuizController);

// DELETE QUIZ
quizRouter.delete('/delete/:quizId', deleteQuizController);

// EDIT QUIZ
quizRouter.put('/edit', editQuizController);

export default quizRouter;