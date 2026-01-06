import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// ADD CARD
export const addCard = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/card/add`, formData);
        return response.data;
    } catch (error) {
        console.error('Error on addCard:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to add card'
        };
    }
};

// FETCH ALL CARD
export const fetchAllCard = async (deckId) => {
    try {
        const response = await axios.get(`${API_URL}/api/card/fetchAll/${deckId}`);
        return response.data;
    } catch (error) {
        console.error('Error on addCard:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch cards'
        };
    }
};

// DELETE CARD
export const deleteCard = async (cardId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/card/delete/${cardId}`);
        return response.data;
    } catch (error) {
        console.error('Error on deleteCard:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete cards'
        };
    }
};
