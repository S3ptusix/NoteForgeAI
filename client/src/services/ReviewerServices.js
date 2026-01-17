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

// FETCH ONE REVIEWER
export const fetchOneReviewer = async (reviewerId) => {
    try {
        const response = await axios.get(`${API_URL}/api/reviewer/fetch/${reviewerId}`);
        return response.data;
    } catch (error) {
        console.error('Error on fetchOneReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch reviewer'
        };
    }
};

// DELETE REVIEWER
export const deleteReviewer = async (reviewerId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/reviewer/delete/${reviewerId}`);
        return response.data;
    } catch (error) {
        console.error('Error on deleteReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete reviewer'
        };
    }
};

// EDIT REVIEWER
export const editReviewer = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}/api/reviewer/edit/`, formData);
        return response.data;
    } catch (error) {
        console.error('Error on editReviewer:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to edit reviewer'
        };
    }
};