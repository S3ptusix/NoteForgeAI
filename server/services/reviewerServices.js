import { Reviewers, Users } from "../models/fk.js";
import { cleanHTML } from "../utils/format.js";

// ADD REVIEWER
export const addReviewerService = async (userId, reviewerName, content) => {
    try {
        const user = await Users.findOne({ where: { id: userId } });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        if (!reviewerName || !reviewerName.trim()) {
            return { success: false, message: "Please enter a reviewer name." };
        }

        await Reviewers.create({
            userId,
            reviewerName: reviewerName.trim(),
            content: cleanHTML(content || "")
        });

        return { success: true, message: "Reviewer created successfully" };

    } catch (error) {
        console.log('Error on addReviewerService:', error);
        return { success: false, message: 'Error on addReviewerService' };
    }
};

// FETCH ALL REVIEWER
export const fetchAllReviewerService = async (userId) => {
    try {
        const user = await Users.findOne({ where: { id: userId } });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        const reviewers = await Reviewers.findAll({
            attributes: ['id', 'reviewerName', 'content'],
            where: { userId }
        })

        return { success: true, reviewers };
    } catch (error) {
        console.log('Error on fetchAllReviewerService:', error);
        return { success: false, message: 'Error on fetchAllReviewerService' };
    }
};

// DELETE REVIEWER
export const deleteReviewerService = async (reviewerId) => {
    try {

        if (!reviewerId) {
            return { success: false, message: "Reviewer ID is required" };
        }

        const rowsAffected = await Reviewers.destroy({
            where: { id: reviewerId }
        });

        if (!rowsAffected) {
            return { success: false, message: "Reviewer not found." };
        }

        return {
            success: true,
            message: "Reviewer deleted successfully"
        };

    } catch (error) {
        console.log("Error on deleteReviewerService:", error);
        return {
            success: false,
            message: "Error on deleteReviewerService"
        };
    }
};