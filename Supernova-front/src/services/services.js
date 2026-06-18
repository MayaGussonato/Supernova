import axios from 'axios'

export const apiPort = "7141"

const localApi = `https://localhost:${apiPort}/`

const api = axios.create({
    baseURL: localApi
});

export default api;