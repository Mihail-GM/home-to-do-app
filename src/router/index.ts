import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import AppContent from "@/AppContent.vue";
import Tasks from "@/views/Tasks.vue";
import LivingRoom from "@/views/Rooms/LivingRoom.vue";
import Members from "@/views/Members.vue";
import Registration from "@/views/Registration.vue";
import Login from "@/views/Login.vue";
import Bedroom from "@/views/Rooms/Bedroom.vue";
import Kitchen from "@/views/Rooms/Kitchen.vue";
import DiningRoom from "@/views/Rooms/DiningRoom.vue";
import Bathroom from "@/views/Rooms/Bathroom.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: AppContent,
        children: [
            {
                path: '',
                redirect: '/dashboard',
            },

            {
                path: '/dashboard',
                component: Home,
            },

            {
                path: '/tasks',
                component: Tasks,
            },

            {
                path: '/members',
                component: Members,
            },

            {
                path: '/living-room',
                component: LivingRoom,
            },

            {
                path: '/bedroom',
                component: Bedroom,
            },

            {
                path: '/kitchen',
                component: Kitchen,
            },

            {
                path: '/dining-room',
                component: DiningRoom,
            },

            {
                path: '/bathroom',
                component: Bathroom,
            },
        ],
    },

    {
        path: '/login',
        component: Login,
    },

    {
        path: '/register',
        component: Registration,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
