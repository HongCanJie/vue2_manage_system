// 此文件用于定义接口名称（一般由后端提供接口）

// 引入mock用于拦截ajax请求自定义返回请求的数据
import Mock from 'mockjs'
// 引入home相关数据
import homeApi from './mockServeData/home'
// 引入user相关数据
import userApi from './mockServeData/user'
// 引入permission相关数据
import permissionApi from './mockServeData/permission'


// 首页 定义mock请求拦截 获取数据
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 用户列表 定义mock请求拦截 
Mock.mock('/api/user/add', 'post', userApi.createUser)//添加数据
Mock.mock('/api/user/edit', 'post', userApi.updateUser)//修改数据
Mock.mock('/api/user/del', 'post', userApi.deleteUser)//删除数据
Mock.mock(/api\/user\/getUser/, userApi.getUserList)//获取数据

// 用户登录权限 定义mock请求拦截 
Mock.mock(/api\/permission\/getMenu/, 'post', permissionApi.getMenu)//根据用户登录信息获取菜单列表

