import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// USER REGISTRATION
export const handleRegister = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/register`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error registration', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to register account'
        };
    }
};

// USER LOGIN
export const handleLogin = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error login', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to login account'
        };
    }
};