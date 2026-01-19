import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/sequelize.js';
import deckRouter from './routes/deckRoutes.js';
import cardRouter from './routes/cardRoutes.js';
import generateRouter from './routes/generateRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import quizRouter from './routes/quizRoutes.js';
import reviewerRoute from './routes/reviewerRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173', // frontend origin
    credentials: true
}));
app.use(cookieParser());

app.use('/api/deck', deckRouter);
app.use('/api/card', cardRouter);
app.use('/api/generate', generateRouter);
app.use('/api/user', userRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/reviewer', reviewerRoute);

// TEST
app.get('/', (req, res) => {
    res.send("API Working")
})

// START SERVER
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server running on PORT: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

startServer();
