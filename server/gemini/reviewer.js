import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractJSON } from "../utils/extractJSON.js";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const generateReviewer = async (notes) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
        You are an AI that generates study reviewers.

        Return ONLY a JSON object in this exact format:

        {
        "reviewerName": "",
        "content": ""
        }

        CONTENT RULES — YOU MUST FOLLOW THESE EXACTLY:

        1. Output must be PURE HTML compatible with TipTap StarterKit + Highlight.
        2. You are ONLY allowed to use these tags:

        HEADINGS:
        - <h1>, <h2>, <h3>

        TEXT:
        - <p>
        - <strong> for bold
        - <em> for italic
        - <s> for strikethrough
        - <mark> for highlight important terms

        LISTS:
        - <ul><li>
        - <ol><li>

        OPTIONAL:
        - <pre><code> for code blocks

        3. DO NOT USE:
        - markdown
        - tables
        - images
        - inline styles
        - underline tag
        - divs or spans

        4. Structure the reviewer like:

        <h1>Main Topic</h1>

        <p>Short introduction</p>

        <h2>Key Concepts</h2>
        <ul>
        <li>...</li>
        </ul>

        <h2>Details</h2>
        <h3>Subtopic</h3>
        <p>...</p>

        Use <mark> to highlight the most important terms.

        NOTES TO CONVERT:
        ${notes}
    `;


    try {
        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        try {
            let output = extractJSON(text);

            // ---- CORRECT NORMALIZATION ----
            // ---- FINAL SAFETY + SINGLE STRING HTML ----
            const reviewerName = String(output?.reviewerName || "Untitled Reviewer").trim();

            // Replace literal newlines with nothing but preserve HTML blocks
            const content = String(output?.content || "")
                .replace(/\n\s*/g, '') // remove line breaks and extra spaces after them
                .trim();

            console.log(content);

            return { reviewerName, content };

        } catch (parseErr) {
            console.warn("Failed to parse JSON. Raw response:", text);

            return {
                reviewerName: "Untitled Reviewer",
                content: ""
            };
        }

    } catch (error) {
        console.error("Error generating reviewer:", error);

        return {
            reviewerName: "Untitled Reviewer",
            content: ""
        };
    }
};

// generateReviewer(`
//         A moon landing is the arrival of a spacecraft on the lunar surface, categorized as either "hard" (intentional crash) or "soft" (intact landing).
//     The First Human Landing: Apollo 11
//     On July 20, 1969, the United States' Apollo 11 mission became the first to successfully land humans on the Moon.
//     The Crew: Commander Neil Armstrong, Lunar Module Pilot Buzz Aldrin, and Command Module Pilot Michael Collins.
//     The Landing: The lunar module Eagle touched down at Tranquility Base in the Sea of Tranquility at 4:17 PM EDT.
//     First Steps: Neil Armstrong became the first human to walk on the Moon at 10:56 PM EDT, declaring: "That's one small step for [a] man, one giant leap for mankind". Aldrin followed 19 minutes later.
//     Activities: The astronauts spent roughly 2.5 hours exploring, collecting 47.5 lbs (21.5 kg) of lunar material, and deploying scientific instruments.
//     Historical & Scientific Context
//     Total Human Landings: Between 1969 and 1972, six Apollo missions (11, 12, 14, 15, 16, and 17) successfully landed a total of 12 people on the Moon.
//     The Space Race: The Apollo program was the culmination of a decade-long competition between the U.S. and the Soviet Union.
//     Uncrewed Milestones:
//     Luna 2 (USSR, 1959): First human-made object to impact the Moon.
//     Luna 9 (USSR, 1966): First successful uncrewed soft landing.
//     Chang'e 4 (China, 2019): First soft landing on the Moon's far side.
//     Future Missions (Artemis Program)
//     As of January 2026, NASA is actively preparing to return humans to the Moon through the Artemis program.
//     Artemis II: Scheduled for early 2026 (targeting February), this mission will carry a crew of four around the Moon without landing.
//     Artemis III: Currently targeted for 2027 or later, this mission aims to land the first woman and first person of color on the lunar surface.
//     Commercial Growth: Private companies like Firefly Aerospace and Intuitive Machines successfully achieved commercial uncrewed soft landings in early 2025.
// `);