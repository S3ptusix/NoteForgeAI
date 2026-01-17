import express from 'express';
import { addReviewerController, deleteReviewerContoller, editReviewerController, fetchAllReviewerController, fetchOneReviewerController } from '../controllers/reviewerControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const reviewerRoute = express.Router();

// ADD REVIEWER 
reviewerRoute.post('/add', authenticateUserJWT, addReviewerController);

// FETCH ALL REVIEWER 
reviewerRoute.get('/fetchAll', authenticateUserJWT, fetchAllReviewerController);

// FETCH ONE REVIEWER 
reviewerRoute.get('/fetch/:reviewerId', fetchOneReviewerController);

// DELETE REVIEWER 
reviewerRoute.delete('/delete/:reviewerId', deleteReviewerContoller);

// EDIT REVIEWER 
reviewerRoute.put('/edit', editReviewerController);

export default reviewerRoute;