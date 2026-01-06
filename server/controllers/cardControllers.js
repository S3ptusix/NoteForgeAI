import { addCardService } from "../services/cardServices.js";

// ADD DECK
export const addCardController = async (req, res) => {
    const { deckId, question, answer } = req.body;
    try {
        const result = await addCardService(deckId, question, answer);
        return res.json(result);
    } catch (error) {
        console.error("Error on addCardController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
