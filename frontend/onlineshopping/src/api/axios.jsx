import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
    baseURL: `http://localhost:8888/`,
});

client.interceptors.request.use(
    config => {
        let accessToken = getAuthorization();
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

const ACCESS_TOKEN = "ONLINE_SHOPPING_AUTH_TOKEN";

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

// 封装参数放到请求头中
export const getAuthorization = () => {
    let accessToken = getAccessToken();
    return accessToken != null
        ? {}
        : {
            Authorization: `Bearer ${getAccessToken()}`,
        };
};

export default client;