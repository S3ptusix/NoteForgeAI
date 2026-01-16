import { addReviewerService, deleteReviewerService, fetchAllReviewerService } from "../services/reviewerServices.js";

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

// FETCH ALL REVIEWER
export const fetchAllReviewerController = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await fetchAllReviewerService(userId);
        return res.json(result);
    } catch (error) {
        console.error("Error on fetchAllReviewerController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// DELETE REVIEWER
export const deleteReviewerContoller = async (req, res) => {
    try {
        const { reviewerId } = req.params;
        const result = await deleteReviewerService(reviewerId);
        return res.json(result);
    } catch (error) {
        console.error("Error on deleteReviewerContoller:", error);
        return res.json({ success: false, message: "Server error" });
    }
};