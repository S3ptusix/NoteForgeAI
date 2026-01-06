import { Cards, Decks } from "../models/fk.js";
import { fixSpaces } from "../utils/format.js";

// ADD CARD
export const addCardService = async (deckId, question, answer) => {
    try {

        if (!deckId || !question?.trim() || !answer?.trim()) {
            return { success: false, message: "Please complete all fields." };
        }
        const deck = await Decks.findByPk(deckId);
        if (!deck) {
            return { success: false, message: "Deck not found." };
        }

        const existing = await Cards.findOne({
            where: { deckId, question }
        });

        if (existing) {
            return { success: false, message: "This question already exists in this deck." };
        }

        const card = await Cards.create({
            deckId,
            question: fixSpaces(question),
            answer: fixSpaces(answer),
        });

        return {
            success: true,
            message: "Card created successfully.",
            card
        };

    } catch (error) {
        console.log("Error on addCardService:", error);
        return { success: false, message: "Error on addCardService." };
    }
};

// FETCH ALL CARD
export const fetchAllCardService = async (deckId) => {
    try {

        if (!deckId) {
            return { success: false, message: "Deck ID is required" };
        }

        const deck = await Decks.findOne({
            attributes: ["deckName"],
            where: { id: deckId }
        });

        if (!deck) {
            return { success: false, message: "Deck not found" };
        }

        const cards = await Cards.findAll({
            where: { deckId },
            attributes: ["id", "question", "answer"],
            order: [["createdAt", "ASC"]]
        });

        return {
            success: true,
            deckName: deck.deckName,
            cards
        };

    } catch (error) {
        console.log("Error on fetchAllCardService:", error);
        return {
            success: false,
            message: "Error on fetchAllCardService"
        };
    }
};

// DELETE CARD
export const deleteCardService = async (cardId) => {
    try {

        if (!cardId) {
            return { success: false, message: "Card ID is required" };
        }

        const rowsAffected = await Cards.destroy({
            where: { id: cardId }
        });

        if (!rowsAffected) {
            return { success: false, message: "Card not found." };
        }

        return {
            success: true,
            message: "card deleted successfully"
        };

    } catch (error) {
        console.log("Error on deleteCardService:", error);
        return {
            success: false,
            message: "Error on deleteCardService"
        };
    }
};
