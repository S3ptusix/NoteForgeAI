import express from 'express';
import { addReviewerController, deleteReviewerContoller, fetchAllReviewerController } from '../controllers/reviewerControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const reviewerRoute = express.Router();

// ADD REVIEWER 
reviewerRoute.post('/add', authenticateUserJWT, addReviewerController);

// FETCH ALL REVIEWER 
reviewerRoute.get('/fetchAll', authenticateUserJWT, fetchAllReviewerController);

// DELETE REVIEWER 
reviewerRoute.delete('/delete/:reviewerId', deleteReviewerContoller);

export default reviewerRoute;