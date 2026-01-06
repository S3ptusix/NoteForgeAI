import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { extractJSON } from '../utils/extractJSON.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const run = async (notes, difficulty = "medium") => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI that generates study flashcards. 
Generate flashcards from the following notes. 
Difficulty level: ${difficulty}.
Return only a JSON array in the exact format below:

[
  { "title": "" },
  { "question": "", "answer": "" }
]

- The first object should have a "title" representing the main topic of the notes.
- The rest of the objects should be flashcards with "question" and "answer" keys.

Notes:
${notes}
`;

    try {
        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        let flashcards;
        try {
            flashcards = extractJSON(text);

            // Ensure the first object has title and the rest have question & answer
            if (flashcards.length > 0 && !flashcards[0].title) {
                flashcards[0].title = "Untitled";
            }

            flashcards = flashcards.map((f, i) => {
                if (i === 0) return { title: f.title || "Untitled" };
                return {
                    question: f.question || "",
                    answer: f.answer || ""
                };
            });
        } catch (e) {
            console.warn("Failed to parse JSON. Raw response:", text);
            flashcards = [];
        }

        console.log(flashcards);
        return flashcards;
    } catch (error) {
        console.error("Error generating flashcards:", error);
    }
};

// Example usage
run(
    `The Moon landing refers to the historic Apollo 11 mission in July 1969, when U.S. astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. A total of 12 astronauts walked on the Moon across six Apollo missions between 1969 and 1972.`,
    "medium"
);
