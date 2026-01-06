import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/sequelize.js';
import deckRouter from './routes/deckRoutes.js';
import cardRouter from './routes/cardRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true
}));

app.use('/api/deck', deckRouter);
app.use('/api/card', cardRouter);

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
