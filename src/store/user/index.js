import { reqLogin, reqsubmitInfo, reqGetInfo, reqLogOut, reqsubmitAva } from "@/services/api"
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
        if (localStorage.getItem("token"))
            localStorage.setItem("token", "")
        let result = await reqLogin({ code, userName, password });
        if (result.code == 200) {
            console.log("result", result);
            localStorage.setItem("token", result.data.token)
            Message({
                type: "success",
                message: "登录成功"
            });
            commit("LOGIN", result.data)
        } else {
            Message({
                type: "error",
                message: "登录失败"
            });
        }
    },
    // 退出登录
    async logOut({ commit }) {
        localStorage.setItem("token", "")
        let result = await reqLogOut();
        if (result.code == 200) {
            localStorage.setItem("token", "")
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
            console.log("222", result.data);
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
    },
    // 上传头像
    async submitAva({ commit }, pictureUrl) {
        console.log("url", pictureUrl);
        let result = await reqsubmitAva(pictureUrl)
        if (result.code == 200) {
            Message({
                type: "success",
                message: "上传成功"
            });
            commit("SUBMITAVA", pictureUrl)
        } else {
            Message({
                type: "error",
                message: "上传失败"
            });
        }
    },
}
const mutations = {
    // 登录
    LOGIN(state, data) {
        // state.token = token
        state.userInfo = data.useInfo
        console.log("userInfo", state.userInfo);
        // console.log("state token", token);
    },
    // 获取用户信息
    GETUSERINFO(state, data) {
        state.userInfo = data
    },
    // 登出
    LOGINOUT(state) {
        state.userInfo = {};
    },
    // 上传头像
    SUBMITAVA(state, data) {
        state = { ...state, avatar: data }
    },
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