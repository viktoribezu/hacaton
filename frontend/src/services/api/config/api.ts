import axios from "axios";

// Настраиваем конфиг для axios
export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("USER_LOCALSTORAGE_KEY") || "token"; localStorage.getItem(USER_LOCALSTORAGE_KEY);

    return config;
});