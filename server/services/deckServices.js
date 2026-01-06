import { Decks, Cards } from "../models/fk.js";

// ADD DECK
export const addDeckService = async (deckName) => {
    try {
        if (!deckName) {
            return { success: false, message: "Please enter a deck name." };
        }

        const deck = await Decks.create({ deckName });

        return { success: true, message: "Deck created successfully" };

    } catch (error) {
        console.log('Error on addDeckService:', error);
        return { success: false, message: 'Error on addDeckService' };
    }
};

// FETCH ALL DECK
export const fetchAllDeckService = async () => {
    try {
        const decks = await Decks.findAll({
            attributes: ["id", "deckName"],
            include: [
                {
                    model: Cards,
                    attributes: ["id", "question", "answer"]
                },
            ],
        });
        
        return {
            success: true,
            decks
        }

    } catch (error) {
        console.log('Error on fetchAllDeckService:', error);
        return { success: false, message: 'Error on fetchAllDeckService' };
    }
}