import { reqTaskHall, reqTaskDetail, reqTaskByStatus, reqMyTaskByStatus } from "@/services/api"
import { Message } from "element-ui";


const actions = {
    // 获取任务大厅所有任务
    async getTaskHall({ commit }, page) {
        let result = await reqTaskHall(page)
        if (result.code == 200) {
            commit("GETTASKHALL", result.data)
        } else {
            Message({
                type: "error",
                message: "获取失败"
            });
        }
    },
    // 获取任务详情
    async getTaskDetail({ commit }, orderNumber) {
        let result = await reqTaskDetail(orderNumber)
        if (result.code == 200) {
            console.log("result", result.data);
            commit("GETTASKDETAIL", result.data)
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
            commit("GETTASKBYSTATUS", result.data)
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
            commit("GETMYTASKBYSTATUS", result.data)
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
        console.log("state.taskDetail", state.taskDetail);
    },
    GETTASKBYSTATUS(state, data) {
        state.task = data
    },
    GETMYTASKBYSTATUS(state, data) {
        state.task = data
    }
}
const state = {
    task: [],
    taskDetail: []

}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}