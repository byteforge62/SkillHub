import axios from "axios";
import ENV from "@/app/config/env";

const client = axios.create({
    baseURL: ENV.API_URL,
    timeout: 15000,
    headers: {
    "Content-Type": "application/json"
    },
    withCredentials:true
});

export default client;