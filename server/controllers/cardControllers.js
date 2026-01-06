import { addCardService, deleteCardService, fetchAllCardService } from "../services/cardServices.js";

// ADD CARD
export const addCardController = async (req, res) => {
    try {
        const { deckId, question, answer } = req.body;
        const result = await addCardService(deckId, question, answer);
        return res.json(result);
    } catch (error) {
        console.error("Error on addCardController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// FETCH ALL CARD
export const fetchAllCardController = async (req, res) => {
    try {
        const { deckId } = req.params;
        const result = await fetchAllCardService(deckId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchAllCardController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// DELETE CARD
export const deleteCardController = async (req, res) => {
    try {
        const { cardId } = req.params;
        const result = await deleteCardService(cardId);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteCardController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
