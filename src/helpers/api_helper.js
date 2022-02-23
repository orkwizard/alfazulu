import axios from "axios";
import { API_PROD } from "../constant/constant";

//pass new generated access token here
const token = 'accessToken';

//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
    baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export async function get(url, config = {}) {
    return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
    return axiosApi
      .post(url, { ...data }, { ...config })
      .then(response => response.data);
}

export async function put(url, data, config = {}) {
    return axiosApi
      .put(url, { ...data }, { ...config })
      .then(response => response.data);
}

export async function del(url, config = {}) {
    return await axiosApi
      .delete(url, { ...config })
      .then(response => response.data);
}



//PRODUCCION
const API_DEFAULT = API_PROD

const axiosApiDefault = axios.create({
    baseURL: API_DEFAULT,
});

axiosApiDefault.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axiosApiDefault.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);
export async function getApi(url, config = {}) {
    return await axiosApiDefault.get(url, { ...config }).then(response => response.data);
}