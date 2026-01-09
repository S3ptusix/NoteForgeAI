import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// ADD DECK
export const addDeck = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/deck/add`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on addDeck:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to add deck'
        };
    }
};

// FETCH ALL DECK
export const fetchAllDeck = async (formData) => {
    try {
        const response = await axios.get(`${API_URL}/api/deck/fetchAll`, formData);
        return response.data;
    } catch (error) {
        console.error('Error on fetchAllDeck:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch decks'
        };
    }
};

// FETCH ONE DECK
export const fetchOneDeck = async (deckId) => {
    try {
        const response = await axios.get(`${API_URL}/api/deck/fetch/${deckId}`);
        return response.data;
    } catch (error) {
        console.error('Error on fetchOneDeck:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetching deck'
        };
    }
};

// DELETE DECK
export const deleteDeck = async (deckId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/deck/delete/${deckId}`);
        return response.data;
    } catch (error) {
        console.error('Error on deleteDeck:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete deck'
        };
    }
};

// EDIT DECK
export const editDeck = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}/api/deck/edit`, formData);
        return response.data;
    } catch (error) {
        console.error('Error on editDeck:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to edit deck'
        };
    }
};

