import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// ADD QUIZ
export const addQuiz = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/quiz/add`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on addQuiz:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to add quiz'
        };
    }
};

// FETCH ALL QUIZ
export const fetchAllQuiz = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/quiz/fetchAll`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error on fetchAllQuiz:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch all quiz'
        };
    }
};

// DELETE QUIZ
export const deleteQuiz = async (quizId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/quiz/delete/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error on deleteQuiz:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete quiz'
        };
    }
};
