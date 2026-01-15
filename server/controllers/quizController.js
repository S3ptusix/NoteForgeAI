import { addQuizService, deleteQuizService, editQuizService, fetchAllQuizService, fetchOneQuizService } from "../services/quizServices.js";


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

// FETCH ALL QUIZ
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

// FETCH ONE QUIZ
export const fetchOneQuizController = async (req, res) => {
    try {
        const { quizId } = req.params;
        const result = await fetchOneQuizService(quizId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchAllQuizController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// DELETE QUIZ
export const deleteQuizController = async (req, res) => {
    try {
        const { quizId } = req.params;
        const result = await deleteQuizService(quizId);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteQuizController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// EDIT QUIZ
export const editQuizController = async (req, res) => {
    try {
        const { quizId, quizName, questions } = req.body;
        const result = await editQuizService(quizId, quizName, questions);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteQuizController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
