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
// 注册
export const reqRegi = (data) => {
    return requests({
        url: "/user/userInfo/addUser",
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
// 取消任务
export const reqEndOrCancleTask = (data) => {
    const { orderNumber, status } = data
    return requests({
        url: `/task/taskStatusInfo/updateOrderStatus?orderNumber=${orderNumber}&status=${status}`,
        method: "post",
    })
}
// 创建任务
export const reqCreateTask = (data) => {
    return requests({
        url: `/task/taskInfo/createTask`,
        method: "put",
        data
    })
}
// 获取公告
export const reqAnnounce = () => {
    return requests({
        url: `/task/noticeInfo/getNoticeInfo`,
        method: "get",
    })
}
// 创建公告
export const reqNewAnnounce = (data) => {
    return requests({
        url: `/task/noticeInfo/addNoticeInfo`,
        method: "put",
        data
    })
}
// 获取我的公告信息
export const reqMyNewAnnounce = () => {
    return requests({
        url: `/task/noticeInfo/getNoticeInfoMyself`,
        method: "get",
    })
}
// 删除公告
export const reqDelAnnounce = (id) => {
    return requests({
        url: `/task/noticeInfo/deleteNoticeInfo/${id}`,
        method: "delete",
    })
}
// 获取全部地址
export const reqAllAddress = () => {
    return requests({
        url: `/user/userAddressInfo/getAllAddressInfo`,
        method: "get",
    })
}
// 获取默认地址
export const reqDefAddress = () => {
    return requests({
        url: `/user/userAddressInfo/getDefaultAddressInfo`,
        method: "get",
    })
}
// 新增地址
export const reqNewAddress = (data) => {
    return requests({
        url: `/user/userAddressInfo/addAddressInfo`,
        method: "put",
        data
    })
}
// 修改地址
export const reqEditAddress = (data) => {
    return requests({
        url: `/user/userAddressInfo/changAddressInfo`,
        method: "post",
        data
    })
}
// 订单评价
export const reqRate = (data) => {
    return requests({
        url: `/task/orderEvaluationInfo/addEvaluation`,
        method: "put",
        data
    })
}
// 获取评价
export const reqGetRate = (data) => {
    return requests({
        url: `/task/orderEvaluationInfo/getEvaluation/${data}`,
        method: "get",
    })
}
// 获取维修信息
export const reqFixedInfo = () => {
    return requests({
        url: `/task/repairOrderInfo/getInfo`,
        method: "get",
    })
}
// 删除维修单
export const reqDelFix = (number) => {
    return requests({
        url: `/task/repairOrderInfo/deleteOrder?repairOrderNumber=${number}`,
        method: "POST",
    })
}
// 取消维修单
export const reqCancleFix = (number) => {
    return requests({
        url: `/task/repairOrderInfo/cancelOrder?repairOrderNumber=${number}`,
        method: "POST",
    })
}
// 创建维修单
export const reqNewFix = (data) => {
    return requests({
        url: `/task/repairOrderInfo/createRepairOrder`,
        method: "put",
        data
    })
}
// 回复评价
export const reqReplyRate = (content, orderNumber) => {
    return requests({
        url: `/task/orderEvaluationInfo/addReply?content=${content}&orderNumber=${orderNumber}`,
        method: "post",
    })
}
// 删除评价
export const reqDelRate = (id) => {
    return requests({
        url: `/task/orderEvaluationInfo/deleteEvaluation/${id}`,
        method: "delete",
    })
}
// 获取钱包金额
export const reqGetCount = () => {
    return requests({
        url: `/user/count/getM`,
        method: "get",
    })
}
// 充值
export const reqAddCount = (value) => {
    return requests({
        url: `/user/count/addM?amount=${value}`,
        method: "post",
    })
}
// 支付
export const reqPay = (value, id) => {
    return requests({
        url: `/task/taskStatusInfo/payfor?amount=${value}&id=${id}`,
        method: "post",
    })
}

// 订单投诉
export const reqSue = (content, orderId, rid) => {
    return requests({
        url: `/task/complaintInfo/addComplaint?content=${content}&orderId=${orderId}&rid=${rid}`,
        method: "put",
    })
}
// 获取投诉信息
export const reqSueInfo = () => {
    return requests({
        url: `/task/complaintInfo/getComplaint`,
        method: "get",
    })
}
// 删除投诉信息
export const reqDelSue = () => {
    return requests({
        url: `/task/complaintInfo/removeComplaint`,
        method: "delete",
    })
}
// 删除投诉信息
export const reqPost = () => {
    return requests({
        url: `/task/advertisementInfo/get`,
        method: "get",
    })
}
