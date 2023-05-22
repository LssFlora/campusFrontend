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
import Mine from "@/pages/Mine"
import MyTask from "@/pages/Mine/MyTask"
import MyLach from "@/pages/Mine/MyLach"
import TaskDetail from "@/pages/TaskDetail"
import TaskList from "@/pages/TaskList"
import LachTask from "@/pages/LachTask"
import FixHall from "@/pages/FixHall"
import FixHistory from "@/pages/FixHall/FixHistory"
import NewFix from "@/pages/FixHall/NewFix"
import AnnounceHall from "@/pages/AnnounceHall"
import AllAnnounce from "@/pages/AnnounceHall/AllAnnounce"
import NewAnnounce from "@/pages/AnnounceHall/NewAnnounce"





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
        children: [
            {
                path: "taskList",
                component: TaskList
            },
            {
                path: "taskDetail",
                component: TaskDetail
            }, {
                path: "lachTask",
                component: LachTask
            }
        ]
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
    }, {
        path: "/mine",
        component: Mine,
        children: [
            {
                path: "myTask",
                component: MyTask,
                children: [
                    {
                        path: "taskList",
                        component: TaskList
                    },
                    {
                        path: "taskDetail",
                        component: TaskDetail
                    },
                ]
            },
            {
                path: "myLach",
                component: MyLach,
                children: [
                    {
                        path: "taskList",
                        component: TaskList
                    },
                    {
                        path: "taskDetail",
                        component: TaskDetail
                    },
                ]
            },
        ]
    },
    {
        path: "/fixHall",
        component: FixHall,
        children: [
            {
                path: "fixHistory",
                component: FixHistory
            },
            {
                path: "newFix",
                component: NewFix
            },
        ]
    },
    {
        path: "/announceHall",
        component: AnnounceHall,
        children: [
            {
                path: "allAnnounce",
                component: AllAnnounce
            },
            {
                path: "newAnnounce",
                component: NewAnnounce
            },
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