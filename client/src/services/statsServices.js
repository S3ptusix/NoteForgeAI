import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';


// COUNT DECK, QUIZ AND REVIEWER
export const countDeckQuizReviewer = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/stats/countDeckQuizReviewer`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on countDeckQuizReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to count stats'
        };
    }
};
