import { Decks, Cards, Users, Quizzes, Questions, Reviewers } from "../models/fk.js";
import { generateFlashcard } from '../gemini/flashcard.js'
import { isValidFlashcard, validateQuestions } from "../utils/validate.js";
import { generateQuiz } from "../gemini/quiz.js";
import { generateReviewer } from "../gemini/reviewer.js";

// GENERATE FLASHCARD
export const generateFlashcardService = async (userId, notes) => {
    try {

        const user = await Users.findOne({ where: { id: userId } });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        if (!notes?.trim()) {
            return { success: false, message: "Please enter a note." };
        }

        const flashcards = await generateFlashcard(notes);

        // Validate deck & cards
        if (!isValidFlashcard(flashcards)) {
            return { success: false, message: "Generated flashcards are invalid." };
        }

        // Create deck in DB
        const deck = await Decks.create({ userId, deckName: flashcards.deck.title });

        // Prepare cards with deckId
        const cardsToCreate = flashcards.cards.map(card => ({
            deckId: deck.id,
            question: card.question,
            answer: card.answer
        }));

        // Save all cards
        await Cards.bulkCreate(cardsToCreate);

        return {
            success: true,
            message: "Flashcards generated successfully."
        };

    } catch (error) {
        console.log("Error on generateFlashcardService:", error);

        return {
            success: false,
            message: "Error while generating flashcards."
        };
    }
};

// GENERATE QUIZ
export const generateQuizService = async (userId, notes) => {
    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return { success: false, message: "User not found." };
        }

        if (!notes?.trim()) {
            return { success: false, message: "Please enter a note." };
        }

        const generatedQuiz = await generateQuiz(notes);

        if (typeof generatedQuiz.quizName !== "string") {
            return { success: false, message: "Error while generating quiz." };
        }

        const quizName = (generatedQuiz.quizName || "Untitled").trim();
        const questions = Array.isArray(generatedQuiz.questions) ? generatedQuiz.questions : [];

        if (questions.length === 0) return { success: false, message: "Error while generating quiz." };

        const questionsError = validateQuestions(questions);
        if (questionsError) {
            return { success: false, message: "Error while generating quiz." };
        }

        // Create quiz
        const quiz = await Quizzes.create({ userId, quizName });

        // Normalize questions
        const questionsWithQuizId = questions.map((q) => ({
            quizId: quiz.id,
            question: (q.question || "").trim(),
            optionA: (q.optionA || "").trim(),
            optionB: (q.optionB || "").trim(),
            optionC: (q.optionC || "").trim(),
            optionD: (q.optionD || "").trim(),
            answer: ["A", "B", "C", "D"].includes(q.answer?.toUpperCase()) ? q.answer.toUpperCase() : "A"
        }));

        await Questions.bulkCreate(questionsWithQuizId);

        return { success: true, message: "Quiz generated successfully." };

    } catch (error) {
        console.error("Error on generateQuizService:", error);

        return { success: false, message: "Error while generating quiz." };
    }
};

// GENERATE REVIEWER
export const generateReviewerService = async (userId, notes) => {
    try {

        const user = await Users.findOne({ where: { id: userId } });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        if (!notes?.trim()) {
            return { success: false, message: "Please enter a note." };
        }

        const generatedReviewer = await generateReviewer(notes);

        await Reviewers.create({ userId, reviewerName: generatedReviewer.reviewerName, content: generatedReviewer.content });

        return {
            success: true,
            message: "Reviewer generated successfully."
        };

    } catch (error) {
        console.log("Error on generateReviewerService:", error);

        return {
            success: false,
            message: "Error while generating reviewer."
        };
    }
};