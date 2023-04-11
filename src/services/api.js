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

