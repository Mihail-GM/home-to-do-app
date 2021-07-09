import Vue from 'vue'
import Vuex from 'vuex'

import Tasks from "./modules/Tasks"
import Snackbar from "@/store/modules/Snackbar";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Tasks,
        Snackbar
    }
});

export default store;
