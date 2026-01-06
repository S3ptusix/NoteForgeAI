import { addCardService, deleteCardService, editCardService, fetchAllCardService, fetchOneCardService } from "../services/cardServices.js";

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

// FETCH ONE CARD
export const fetchOneCardController = async (req, res) => {
    try {
        const { cardId } = req.params;
        const result = await fetchOneCardService(cardId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchOneCardController:", error);
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

// EDIT CARD
export const editCardController = async (req, res) => {
    try {
        const { cardId, question, answer } = req.body;
        const result = await editCardService(cardId, question, answer);
        return res.json(result);
    } catch (error) {
        console.error("Error on editCardController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};