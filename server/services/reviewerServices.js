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