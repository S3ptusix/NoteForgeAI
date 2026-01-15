import { Sequelize } from "sequelize";
import { Quizzes, Questions, Users } from "../models/fk.js";
import { validateQuestions } from "../utils/validate.js";

// ADD QUIZ 
export const addQuizService = async (userId, quizName, questions) => {
    try {

        const user = await Users.findByPk(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        if (!quizName?.trim()) {
            return { success: false, message: "Please enter a quiz name." };
        }

        const questionsError = validateQuestions(questions);
        if (questionsError) return { success: false, message: questionsError };

        const quiz = await Quizzes.create({ userId, quizName: quizName.trim() });

        const questionsWithQuizId = questions.map((q) => ({
            quizId: quiz.id,
            question: q.question.trim(),
            optionA: q.optionA.trim(),
            optionB: q.optionB.trim(),
            optionC: q.optionC.trim(),
            optionD: q.optionD.trim(),
            answer: q.answer.toUpperCase()
        }));

        // 6️⃣ Bulk insert questions
        await Questions.bulkCreate(questionsWithQuizId);

        return { success: true, message: "Quiz created successfully." };
    } catch (error) {
        console.error("Error in addQuizService:", error);
        return { success: false, message: "Failed to create quiz." };
    }
};

// FETCH ALL QUIZ
export const fetchAllQuizService = async (userId) => {
    try {
        const user = await Users.findByPk(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        const quizzes = await Quizzes.findAll({
            attributes: [
                'id',
                'quizName',
                [Sequelize.fn('COUNT', Sequelize.col('questions.id')), 'questionCount']
            ],

            include: {
                model: Questions,
                attributes: [],     
                required: false      // keep quizzes even if 0 questions
            },

            group: ['quiz.id']
        });

        return {success: true, quizzes}
    } catch (error) {
        console.error("Error in fetchAllQuizService:", error);
        return { success: false, message: "Failed to fetch all quiz." };
    }
}
