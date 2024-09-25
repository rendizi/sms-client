import axios from "axios";

export const proxy = axios.create({
    // baseURL: 'https://api.enis.lol/'
    baseURL: 'http://127.0.0.1:4000',
    withCredentials: true 
})