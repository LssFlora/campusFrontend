import { reqTaskHall, reqTaskDetail, reqTaskByStatus, reqMyTaskByStatus, reqGetRate } from "@/services/api"
import { Message } from "element-ui";


const actions = {
    // 获取任务大厅所有任务
    async getTaskHall({ commit }, page) {
        let result = await reqTaskHall(page)
        if (result.code == 200) {
            commit("GETTASKHALL", result.data || [])
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
    // 获取任务详情
    async getTaskDetail({ commit, state }, orderNumber) {
        state.taskDetail ? state.taskDetail = [] : ""
        let result = await reqTaskDetail(orderNumber)
        if (result.code == 200) {
            commit("GETTASKDETAIL", result.data || {})
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
    // 获取评价
    async getRate({ commit, state }, orderNumber) {
        state.rate ? state.rate = {} : ""
        let result = await reqGetRate(orderNumber)
        if (result.code == 200) {
            commit("GETRATE", result.data || null)
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
    // 根据状态获取我的发布任务
    async getTaskByStatus({ commit }, status) {
        let result = await reqTaskByStatus(status)
        if (result.code == 200) {
            commit("GETTASKBYSTATUS", result.data || {})
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
    // 根据状态获取我的抢单任务
    async getMyTaskByStatus({ commit }, status) {
        let result = await reqMyTaskByStatus(status)
        if (result.code == 200) {
            commit("GETMYTASKBYSTATUS", result.data || [])
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
}
const mutations = {
    // 获取任务大厅任务
    GETTASKHALL(state, data) {
        state.task = data
    },
    // 获取任务详情
    GETTASKDETAIL(state, data) {
        state.taskDetail = data
    },
    GETTASKBYSTATUS(state, data) {
        state.task = data
    },
    GETMYTASKBYSTATUS(state, data) {
        state.task = data
    },
    GETRATE(state, data) {
        state.rate = data
    }
}
const state = {
    task: [],
    taskDetail: [],
    rate: {}

}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}