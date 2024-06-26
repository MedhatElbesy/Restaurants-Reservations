import axios from '../../axios';

export const login = async (email, password) => {
    console.log('Attempting login with:', { email, password });
    const response = await axios.post(`/login`, { email, password });
    return response.data;
};
