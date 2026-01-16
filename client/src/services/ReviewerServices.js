import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// ADD REVIEWER
export const addReviewer = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/reviewer/add`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on addReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to add reviewer'
        };
    }
};