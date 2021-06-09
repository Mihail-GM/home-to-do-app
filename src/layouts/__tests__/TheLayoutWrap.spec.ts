import {shallowMount, RouterLinkStub, createLocalVue, mount} from '@vue/test-utils'
import TheLayoutWrap from "@/layouts/TheLayoutWrap.vue";
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";
import {VNavigationDrawer} from "vuetify/lib";

const localVue = createLocalVue();
localVue.use(Vuetify);

const routes = [{path: '/dashboard', component: Home}]

const router = new VueRouter({
    routes
})

function createWrapper(overrides: any): any {

    let vuetify = new Vuetify()

    const defaultMountingOptions = {
        localVue,
        vuetify,
        stubs: ['router-link', 'router-view'],
        router,
    }

    return shallowMount(TheLayoutWrap, merge(defaultMountingOptions, overrides));
}

describe('TheLayoutWrap.vue', () => {

    let vuetify: Vuetify

    beforeEach(() => {

        vuetify = new Vuetify();
    })

    test('should render TheLayoutWrap on mount', () => {

        const wrapper = createWrapper(vuetify);

        expect(wrapper.is(TheLayoutWrap)).toBe(true);
    })

})
