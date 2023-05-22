// 统一管理项目接口模块
// 引入二次封装的axios（带有请求，相应拦截器）
import requests from './request'


// 获取账号登录的验证图片
export const reqNumberCode = () => {
    return requests({
        url: '/user/login/getCode',
        method: 'get',
        responseType: 'blob',
    })
}
// 登录
export const reqLogin = (data) => {
    return requests({
        url: "/user/login/in",
        method: "post",
        data,
    })
}
// 登出
export const reqLogOut = () => {
    return requests({
        url: "/user/login/out",
        method: "get",
    })
}
// 获取用户信息
export const reqGetInfo = () => {
    return requests({
        url: "/user/userInfo/getInformation",
        method: "get"
    })
}
// 更新用户信息
export const reqsubmitInfo = (data) => {
    return requests({
        url: "/user/userInfo/updateInfo",
        method: "post",
        data,
    })
}
// 上传头像
export const reqsubmitAva = (data) => {
    return requests({
        url: `/user/userInfo/updatePicture?pictureUrl=${data}`,
        method: "post",
    })
}
// 分页获取任务大厅任务
export const reqTaskHall = (page) => {
    return requests({
        url: `/task/taskInfo/getNewOrder/${page}/12`,
        method: "get",
    })
}
// 订单号获取订单
export const reqTaskDetail = (orderNumber) => {
    return requests({
        url: `/task/taskInfo/getinfo/${orderNumber}`,
        method: "get",
    })
}
// 根据状态获取我的发布订单
export const reqTaskByStatus = (status) => {
    return requests({
        url: `/task/taskInfo/getSelfOrderByStatus/${status}`,
        method: "get",
    })
}
// 根据状态获取我的抢单订单
export const reqMyTaskByStatus = (status) => {
    return requests({
        url: `/task/taskInfo/getOrderByStatus/${status}`,
        method: "get",
    })
}
// 抢单
export const reqRobTask = (data) => {
    const { orderNumber, userId } = data
    return requests({
        url: `/task/taskStatusInfo/getNewTask?orderNumber=${orderNumber}&userId=${userId}`,
        method: "put",
    })
}
// 抢单
export const reqEndOrCancleTask = (data) => {
    const { orderNumber, status } = data
    return requests({
        url: `/task/taskStatusInfo/updateOrderStatus?orderNumber=${orderNumber}&status=${status}`,
        method: "post",
    })
}