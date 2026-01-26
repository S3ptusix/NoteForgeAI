import { countDeckQuizReviewerService } from "../services/statsServices.js";

// COUNT DECK, QUIZ AND REVIEWER
export const countDeckQuizReviewerController= async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await countDeckQuizReviewerService(userId);
        return res.json(result);
    } catch (error) {
        console.error("Error on countDeckQuizReviewerController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
