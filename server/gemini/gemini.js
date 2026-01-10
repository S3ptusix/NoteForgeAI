import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractJSON } from "../utils/extractJSON.js";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const generateFlashcard = async (notes) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
        You are an AI that generates study flashcards. 
        Return ONLY a JSON object in the exact format below:

        {
        "deck": { "title": "" },
        "cards": [
            { "question": "", "answer": "" }
        ]
        }

        Rules:
        - "deck.title" must contain the topic of the notes.
        - "cards" must be an array.
        - Every card must have "question" and "answer".
        - Do not include explanations, comments, or markdown.

        Notes:
        ${notes}
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        try {
            let output = extractJSON(text);

            // ---- Safety Normalization ----

            // Ensure deck exists
            if (!output.deck) output.deck = {};
            if (!output.deck.title) output.deck.title = "Untitled";

            // Ensure cards is array
            if (!Array.isArray(output.cards)) {
                output.cards = [];
            }

            // Normalize cards
            output.cards = output.cards.map(card => ({
                question: card?.question || "",
                answer: card?.answer || ""
            }));

            return output;
        } catch (parseErr) {
            console.warn("Failed to parse JSON. Raw response:", text);

            return {
                deck: { title: "Untitled" },
                cards: []
            };
        }

    } catch (error) {
        console.error("Error generating flashcards:", error);

        return {
            deck: { title: "Untitled" },
            cards: []
        };
    }
};



// // Example usage
// generateFlashcard(
//     `The Moon landing refers to the historic Apollo 11 mission in July 1969, when U.S. astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. A total of 12 astronauts walked on the Moon across six Apollo missions between 1969 and 1972.`
// );