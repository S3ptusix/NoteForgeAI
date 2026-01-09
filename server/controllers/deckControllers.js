import { addDeckService, deleteDeckService, editDeckService, fetchAllDeckService, fetchOneDeckService } from "../services/deckServices.js";

// ADD DECK
export const addDeckController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { deckName } = req.body;
        const result = await addDeckService(userId, deckName);
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

// FETCH ONE DECK
export const fetchOneDeckController = async (req, res) => {
    try {
        const { deckId } = req.params;
        const result = await fetchOneDeckService(deckId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchOneDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// DELETE DECK
export const deleteDeckController = async (req, res) => {
    try {
        const { deckId } = req.params;
        const result = await deleteDeckService(deckId);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// EDIT DECK
export const editDeckController = async (req, res) => {
    try {
        const { deckId, deckName } = req.body;
        const result = await editDeckService(deckId, deckName);
        return res.json(result);
    } catch (error) {
        console.error("Error on editDeckController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
