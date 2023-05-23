import axios from "axios";

// Настраиваем конфиг для axios
export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem("USER_LOCALSTORAGE_KEY") || "token"
    }
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("USER_LOCALSTORAGE_KEY") || "token";// localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (token) {
        axios.defaults.headers.common["authorization"] = token;
    }

    return config;
});