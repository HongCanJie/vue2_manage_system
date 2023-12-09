// 二次封装部分

// 引入封装的axios
import http from '../utils/request'

// 首页 发送请求并接收对象后暴露
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData');
}

// 用户列表 发送请求并接收对象后暴露
export const getUser = (params) => {
    // 拦截请求的是get方法，params是get请求的参数
    // 返回用户列表
    return http.get('/user/getUser', params)
}//获取数据


export const addUser = (data) => {
    // 拦截请求的是post方法，data是post请求的参数
    return http.post('/user/add', data)
}//添加数据

export const editUser = (data) => {
    // 拦截请求的是post方法，data是post请求的参数
    return http.post('/user/edit', data)
}//修改数据

export const delUser = (data) => {
    // 拦截请求的是post方法，data是post请求的参数
    return http.post('/user/del', data)
}//删除数据


// 用户登录 发送请求并接收对象后暴露
export const getMenu = (data) => {
    // 拦截请求的是post方法，data是post请求的参数
    return http.post('permission/getMenu', data)
} 
