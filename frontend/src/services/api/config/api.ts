import axios from "axios";
import {store} from "@/store/store";

// Настраиваем конфиг для axios
export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    const token = store.getState()?.token?.token
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config;
});