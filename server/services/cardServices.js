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
