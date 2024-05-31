import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
    baseURL: `http://localhost:8080/personblog`,
});

export default client;