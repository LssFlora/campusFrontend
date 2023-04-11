// 对axios进行二次封装
// 引入
import axios from 'axios'
// 引入进度条
// import nProgress from 'nprogress';
// 引入进度条样式
// import "nprogress/nprogress.css"
// 引入detail仓库。目的是拿到uuid_token
import store from "@/store"
import { Message } from "element-ui";


// 创建axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时会自动加上这一段
    baseURL: "http://campus.help.com/api",
    // 设置请求超时时间
    // baseURL: 'https://some-domain.com/api/',
    timeout: 5000,

    cache: false,
});
// 设置请求拦截器：在发请求前，请求拦截器可以检测到，使在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // 要做的事
    // if (store.state.detail.uuid_token) {
    //     // 若有游客id，则在请求头中配置一个字段（userTempId），后台规定好的
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    if (localStorage.getItem("token")) {
        // 若有token,则在请求头中配置，一起发请求
        config.headers.token = localStorage.getItem("token")
    }
    // nProgress.start();
    return config
});

// 设置响应拦截器
requests.interceptors.response.use(
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，做一些事情
    (res) => {
        // nProgress.done();
        return res.data
    },
    // 失败的回调函数

  async error => {
    // token失效的被动处理
    console.log(error)
    if (error.response.data.code === 4111) {
        localStorage.setItem("token","")
      await store.dispatch('logOut')
      Message({
        type: "warning",
        message: "请重新登录"
    });
      this.$router.push("/login")
    } else {
      return Promise.reject(error)
    }
}
)
// 对外暴露
export default requests;