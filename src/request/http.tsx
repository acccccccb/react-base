import axios from 'axios'
import store from '../store/index';

declare module 'axios' {
    export interface AxiosInstance {
        request<T = any> (config: AxiosRequestConfig): Promise<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    }
}

let baseURL = store.getState().baseURL || '';
// let baseURL = '';
let $http = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
});
$http['all'] = axios.all;
$http.interceptors.request.use(function (config) {
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    // config.withCredentials = true;
    let  token = store.getState().token;
    // let  token = sessionStorage.getItem('token');
    if(token) {
        config.headers.token =  token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

$http.interceptors.response.use((res)=>{
    return res.data;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log('错误请求');
                break;
            case 401:
                console.log('未授权，请重新登录');
                break;
            case 402:
                console.log('未授权，请重新登录');
                break;
            case 403:
                console.log('权限不足');
                break;
            case 404:
                console.log('请求错误,未找到该资源');
                break;
            case 405:
                console.log('请求方法未允许');
                break;
            case 408:
                console.log('请求超时');
                break;
            case 500:
                console.log('服务器端出错');
                break;
            case 501:
                console.log('网络未实现');
                break;
            case 502:
                console.log('网络错误');
                break;
            case 503:
                console.log('服务不可用');
                break;
            case 504:
                console.log('网络超时');
                break;
            case 505:
                console.log('http版本不支持该请求');
                break;
            default:
                console.log(`连接错误${err.response.status}`);
        }
    } else {
        console.log('连接到服务器失败');
    }
    return Promise.resolve(err.response);
});

export default $http
