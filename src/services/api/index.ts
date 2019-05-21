import { create } from 'apisauce';
import { TAccessToken } from '@interfaces/login';
const config = require('main/env_config');

const api = create({
    baseURL: config.API_URL,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
});

export const setAuthToken = (userAuth: TAccessToken) => api.setHeader('Authorization', 'Bearer ' + userAuth);
export const removeAuthToken = () => api.deleteHeader('Authorization');

export default api;
