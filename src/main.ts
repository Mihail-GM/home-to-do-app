import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $axios from './plugins/axios'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from "@vue/composition-api"

// @ts-ignore
import Vuelidate from 'vuelidate'

// @ts-ignore
import { VclFacebook, VclInstagram, VclList } from 'vue-content-loading';
// @ts-ignore
import VueContentLoading from 'vue-content-loading';

Vue.use(VclFacebook)
Vue.use(VclInstagram)
Vue.use(VclList)
Vue.use(VueContentLoading)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

/** Axios plugin settings */
Vue.use({
    install(Vue) {
        Vue.prototype.$axios = $axios
    }
});

Vue.use(Vuelidate)

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
