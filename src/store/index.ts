import Vue from 'vue'
import Vuex, {Module} from 'vuex'

import Tasks from "./modules/Tasks"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Tasks
    }
});

export default store;
