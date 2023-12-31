// 引入axios文件
import axios from "axios";

// 创建axios对象
const http = axios.create({
    baseURL: '/api',//通用请求地址前缀
    timeout: 10000,//请求超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 暴露封装的axios对象
export default http;