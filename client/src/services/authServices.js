import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// FETCH USER 
export const loadUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/user/me`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error('Error on loadUser', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch user'
        };
    }
};

// LOGOUT USER
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/user/logout`, { withCredentials: true });
        return response.data;

    } catch (error) {
        console.error('Error on logoutUser', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to logout'
        };
    }
};
