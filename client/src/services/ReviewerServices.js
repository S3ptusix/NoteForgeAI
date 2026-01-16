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

// FETCH ALL REVIEWER
export const fetchAllReviewer = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/reviewer/fetchAll`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on fetchAllReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch reviewer'
        };
    }
};