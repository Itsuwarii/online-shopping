import axios from "axios";

const client = axios.create({
    baseURL: `http://localhost:8888/`,
});

client.interceptors.request.use(
    config => {
        let accessToken = getAccessToken();
        if (accessToken) {
            config.headers = Object.assign({
                Authorization: `${accessToken}`
            }, config.headers);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const ACCESS_TOKEN = "ONLINE_SHOPPING_MARCHANT_AUTH_TOKEN";

// 保存
export const saveAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
};

// 获取
export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};

// 移除
export const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};

export default client;