import { Sequelize } from "sequelize";
import { Quizzes, Questions, Users } from "../models/fk.js";
import { validateQuestions } from "../utils/validate.js";
import { sequelize } from "../config/sequelize.js";

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
                'quizName'
            ],

            include: {
                model: Questions,
                attributes: [
                    'question',
                    'optionA',
                    'optionB',
                    'optionC',
                    'optionD',
                    'answer'
                ]
            }
        });

        return { success: true, quizzes }
    } catch (error) {
        console.error("Error in fetchAllQuizService:", error);
        return { success: false, message: "Failed to fetch all quiz." };
    }
}

// FETCH ONE QUIZ
export const fetchOneQuizService = async (quizId) => {
    try {

        const quiz = await Quizzes.findOne({
            attributes: [
                'id',
                'quizName'
            ],
            include: {
                model: Questions,
                attributes: [
                    'question',
                    'optionA',
                    'optionB',
                    'optionC',
                    'optionD',
                    'answer'
                ]
            },
            where: { id: quizId }
        });

        return { success: true, quiz }
    } catch (error) {
        console.error("Error in fetchOneQuizService:", error);
        return { success: false, message: "Failed to fetch quiz." };
    }
}

// DELETE QUIZ
export const deleteQuizService = async (quizId) => {
    try {

        if (!quizId) {
            return { success: false, message: "Quiz ID is required" };
        }

        const rowsAffected = await Quizzes.destroy({
            where: { id: quizId }
        });

        if (!rowsAffected) {
            return { success: false, message: "Quiz not found." };
        }

        return {
            success: true,
            message: "Quiz deleted successfully"
        };

    } catch (error) {
        console.log("Error on deleteQuizService:", error);
        return {
            success: false,
            message: "Error on deleteQuizService"
        };
    }
};

// EDIT QUIZ
export const editQuizService = async (quizId, quizName, questions) => {
    const t = await sequelize.transaction();

    try {
        // 1️⃣ Find quiz
        const quiz = await Quizzes.findByPk(quizId);

        if (!quiz) {
            await t.rollback();
            return { success: false, message: 'Quiz not found' };
        }

        // 2️⃣ Validate name
        if (!quizName?.trim()) {
            await t.rollback();
            return { success: false, message: "Please enter a quiz name." };
        }

        // 3️⃣ Validate questions
        const questionsError = validateQuestions(questions);
        if (questionsError) {
            await t.rollback();
            return { success: false, message: questionsError };
        }

        // 4️⃣ Update quiz name
        quiz.quizName = quizName.trim();
        await quiz.save({ transaction: t });

        // 5️⃣ Delete old questions
        await Questions.destroy({
            where: { quizId },
            transaction: t
        });

        // 6️⃣ Prepare new questions
        const questionsWithQuizId = questions.map((q) => ({
            quizId: quiz.id,
            question: q.question?.trim() || '',
            optionA: q.optionA?.trim() || '',
            optionB: q.optionB?.trim() || '',
            optionC: q.optionC?.trim() || '',
            optionD: q.optionD?.trim() || '',
            answer: (q.answer || 'A').toUpperCase()
        }));

        // 7️⃣ Bulk insert
        await Questions.bulkCreate(questionsWithQuizId, {
            transaction: t
        });

        await t.commit();

        return {
            success: true,
            message: "Quiz updated successfully."
        };

    } catch (error) {
        await t.rollback();

        console.log("Error on editQuizService:", error);

        return {
            success: false,
            message: "Failed to update quiz."
        };
    }
};
