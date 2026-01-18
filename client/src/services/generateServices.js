import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// GENERATE FLASHCARD
export const generateFlashcard = async (notes) => {
    try {
        const response = await axios.post(`${API_URL}/api/generate/flashcard`, notes, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on generateFlashcard:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to generate flashcard'
        };
    }
};

// GENERATE QUIZ
export const generateQuiz = async (notes) => {
    try {
        const response = await axios.post(`${API_URL}/api/generate/quiz`, notes, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on generateQuiz:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to generate quiz'
        };
    }
};

// GENERATE REVIEWER
export const generateReviewer = async (notes) => {
    try {
        const response = await axios.post(`${API_URL}/api/generate/reviewer`, notes, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on generateReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to generate reviewer'
        };
    }
};
