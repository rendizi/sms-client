import axios from "axios";

export const proxy = axios.create({
    baseURL: '',
    withCredentials: true 
})