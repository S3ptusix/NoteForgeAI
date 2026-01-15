import { addQuizService, fetchAllQuizService } from "../services/quizServices.js";


// ADD QUIZ
export const addQuizController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { quizName, questions } = req.body;
        const result = await addQuizService(userId, quizName, questions);
        return res.json(result);
    } catch (error) {
        console.error("Error on addQuizController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// FETCH QUIZ
export const fetchAllQuizController = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await fetchAllQuizService(userId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchAllQuizController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
