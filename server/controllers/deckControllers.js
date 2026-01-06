import { addDeckService, deleteDeckService, fetchAllDeckService } from "../services/deckServices.js";

// ADD DECK
export const addDeckController = async (req, res) => {
    const { deckName } = req.body;
    try {
        const result = await addDeckService(deckName);
        return res.json(result);
    } catch (error) {
        console.error("Error on addDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// FETCH ALL DECK
export const fetchAllDeckController = async (req, res) => {
    try {
        const result = await fetchAllDeckService();
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchAllDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// DELETE DECK
export const deleteDeckController = async (req, res) => {
    const { deckId } = req.params;
    try {
        const result = await deleteDeckService(deckId);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};