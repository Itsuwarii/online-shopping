import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
    baseURL: `http://localhost:8888/`,
});



client.interceptors.request.use(
    config => {
        config.headers['Authorization'] = '';
        config.headers['Access-Control-Allow-Origin'] = "*";
        config.headers['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
        return config;
    },
)

export default client;