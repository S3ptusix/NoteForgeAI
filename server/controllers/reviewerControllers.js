import { addReviewerService } from "../services/reviewerServices.js";

// ADD REVIEWER
export const addReviewerController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewerName, content } = req.body;
        const result = await addReviewerService(userId, reviewerName, content);
        return res.json(result);
    } catch (error) {
        console.error("Error on addReviewerController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};