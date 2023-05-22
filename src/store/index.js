import Vue from "vue";
import Vuex from 'vuex';
import VueXAlong from 'vuex-along'


Vue.use(Vuex);
import user from "./user";
import task from "./task"

export default new Vuex.Store({
    modules: {
        user,
        task
    },
    plugins: [VueXAlong({
        name: 'along',     //存放在localStroage或者sessionStroage 中的名字
        local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
        // session: { list: ["home", "search", "detail"], isFilter: true }
        //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    })]
})