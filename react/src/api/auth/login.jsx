import axios from '../../axios';

export const login = async (email, password) => {
    console.log('Attempting login with:', { email, password });
    try {
        const response = await axios.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};
