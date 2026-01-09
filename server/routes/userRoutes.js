import express from 'express';
import { LoginUserController, logoutUserController, meUserController, RegisterUserController } from '../controllers/userControllers.js';
import { authenticateUserJWT } from '../middleware/auth.js';

const userRouter = express.Router();

// REGISTER USER
userRouter.post('/register', RegisterUserController);

// // LOGIN USER
userRouter.post('/login', LoginUserController );

// USER ME
userRouter.get('/me', authenticateUserJWT, meUserController);

// USER LOGOUT
userRouter.get('/logout', authenticateUserJWT, logoutUserController);


export default userRouter;