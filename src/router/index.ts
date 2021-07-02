import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import AppContent from "@/AppContent.vue";
import Tasks from "@/views/Tasks.vue";

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
                path: '/living-room',
                component: Tasks,
            },

            {
                path: '/bedroom',
                component: Tasks,
            },

            {
                path: '/kitchen',
                component: Tasks,
            },

            {
                path: '/dining-room',
                component: Tasks,
            },

            {
                path: '/bathroom',
                component: Tasks,
            },
        ],
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
