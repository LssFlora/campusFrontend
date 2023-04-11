import { reqLogin, reqsubmitInfo, reqGetInfo,reqLogOut } from "@/services/api"
import { Message } from "element-ui";
const actions = {
    // 注册
    async register({ commit }, { phone, password, code }) {
        let result = await reqRegister({ phone, password, code })
        if (result.code == 200) {
            return "ok"
        }
    },
    // 登录
    async login({ commit }, { code, userName, password }) {
        let result = await reqLogin({ code, userName, password });
        if (result.code == 200) {
            Message({
                type: "success",
                message: "登录成功"
            });
            commit("LOGIN", result.data.token)
        } else {
            Message({
                type: "error",
                message: "登录失败"
            });
        }
    },
    // 退出登录
    async logOut({ commit }) {
        let result = await reqLogOut();
        localStorage.setItem("token","")
        if (result.code == 200) {
            localStorage.setItem("token","")
            commit("LOGINOUT")
            Message({
                type: "success",
                message: "退出成功！"
            });
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
        }
    },
    // 更新用户信息
    async submitInfo({ commit }, { nickName, phoneNumber, email, sex }) {
        let result = await reqsubmitInfo({ nickName, phoneNumber, email, sex });
        if (result.code == 200) {
            Message({
                type: "success",
                message: "更新成功"
            });
            this.getUserInfo
        } else {
            Message({
                type: "error",
                message: "更新失败"
            });
        }
    }
}
const mutations = {
    // 登录
    LOGIN(state, token) {
        // state.token = token
        localStorage.setItem("token",token)
        // console.log("state token", token);
    },
    // 获取用户信息
    GETUSERINFO(state, data) {
        state.userInfo = data
    },
    // 登出
    LOGINOUT(state) {
        state.userInfo = {};
    }
}
const state = {
    // token: "",
    userInfo: {},
}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}