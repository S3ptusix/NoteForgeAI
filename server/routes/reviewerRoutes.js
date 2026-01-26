import express from 'express';
import { addReviewerController, deleteReviewerContoller, editReviewerController, fetchAllReviewerController, fetchOneReviewerController } from '../controllers/reviewerControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const reviewerRouter = express.Router();

// ADD REVIEWER 
reviewerRouter.post('/add', authenticateUserJWT, addReviewerController);

// FETCH ALL REVIEWER 
reviewerRouter.get('/fetchAll', authenticateUserJWT, fetchAllReviewerController);

// FETCH ONE REVIEWER 
reviewerRouter.get('/fetch/:reviewerId', fetchOneReviewerController);

// DELETE REVIEWER 
reviewerRouter.delete('/delete/:reviewerId', deleteReviewerContoller);

// EDIT REVIEWER 
reviewerRouter.put('/edit', editReviewerController);

export default reviewerRouter;