import { Decks, Quizzes, Reviewers } from "../models/fk.js";

// COUNT DECK, QUIZ AND REVIEWER
export const countDeckQuizReviewerService = async (userId) => {
    try {
        const [deck, quiz, reviewer] = await Promise.all([
            Decks.count({ where: { userId } }),
            Quizzes.count({ where: { userId } }),
            Reviewers.count({ where: { userId } }),
        ]);

        return {
            success: true,
            totals: { deck, quiz, reviewer },
        };
    } catch (error) {
        console.error('Error on countDeckQuizReviewerService:', error);
        return { success: false, message: 'Error on countDeckQuizReviewerService' };
    }
};
