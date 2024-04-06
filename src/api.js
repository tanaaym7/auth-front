import axios from 'axios';

export default axios.create({
    baseURL: 'https://auth-back-6rl5.onrender.com/api',
    withCredentials: true,
    credentials: 'include',
});
