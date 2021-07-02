import {shallowMount, RouterLinkStub, createLocalVue} from '@vue/test-utils'
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";
import TheLayoutWrapMenuList from "@/layouts/TheLayoutWrapMenuList.vue";
import Vue from "vue";

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify);

const routes = [{path: '/dashboard', component: Home}]

const router = new VueRouter({
    routes
})

function createWrapper(overrides: any): any {

    let vuetify = new Vuetify()

    const defaultMountingOptions = {

        stubs: {
            RouterLink: RouterLinkStub
        },
        localVue,
        vuetify,
        router,
    }

    return shallowMount(TheLayoutWrapMenuList, merge(defaultMountingOptions, overrides));
}

describe('TheLayoutWrapMenuList.vue', () => {

    let itemsProp = [
        {
            icon: 'mdi-home-circle',
            title: 'Home',
            to: '/'
        },
        {
            icon: 'mdi-clock',
            title: 'Tasks',
            to: '/tasks'
        },
    ];

    test('should render TheLayoutWrapMenuList on mount', () => {

        const wrapper = createWrapper({
            propsData: {
                itemsProp
            }
        });

        expect(wrapper.is(TheLayoutWrapMenuList)).toBe(true);
    })


    test('render correct first link on menu', async () => {

        const wrapper = createWrapper({
            propsData: {
                itemsProp
            }
        });
        await flushPromises();

        let element = wrapper.find('#menu-link-0');

        expect(element.props().to).toBe('/')
    })

    test('render correct second link on menu', async () => {

        const wrapper = createWrapper({
            propsData: {
                itemsProp
            }
        });
        await flushPromises();

        let element = wrapper.find('#menu-link-1');

        expect(element.props().to).toBe('/tasks')
    })
})
