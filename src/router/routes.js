import PhoneLogin from "@/pages/Login/PhoneLogin"
import NumberLogin from "@/pages/Login/NumberLogin"
import Registration from '@/pages/Registration'
import Home from '@/pages/Home'
import TaskHall from "@/pages/TaskHall"
import Personal from "@/pages/Personal"
import Information from "@/pages/Personal/Information"
import Authentication from "@/pages/Personal/Authentication"
import ExistAddress from "@/pages/Personal/Address/ExistAddress"
import NewAddress from "@/pages/Personal/Address/NewAddress"




export default [
    {
        path: "/phoneLogin",
        component: PhoneLogin,

    },
    {
        path: "/numberLogin",
        component: NumberLogin
    },
    {
        path: "/registration",
        component: Registration
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/taskHall",
        component: TaskHall,
    },
    {
        path: "/personal",
        component: Personal,
        children: [
            {
                path: "information",
                component: Information
            },
            {
                path: "authentication",
                component: Authentication
            }, {
                path: "existAddress",
                component: ExistAddress,
            },
            {
                path: "newAddress",
                component: NewAddress
            }
        ]
    },

    // 页面重定向，项目跑起来时，访问/立马回到首页
    {
        path: "/login",
        redirect: "/numberLogin"
    },
    {
        path: "/",
        redirect: "/numberLogin"
    }
]