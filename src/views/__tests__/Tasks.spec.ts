import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueCompositionAPI from "@vue/composition-api";
import Tasks from "@/views/Tasks.vue";
import VueRouter from "vue-router";
// @ts-ignore
import merge from "lodash.merge"
import flushPromises from "flush-promises";
import Vue from "vue";

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const routes = [{ path: '/tasks', component: Tasks }]

const router = new VueRouter({
	routes
})

function createWrapper(overrides: any): any {

	let vuetify = new Vuetify()

	const defaultMountingOptions = {
		localVue,
		vuetify,
		router,
	}

	return mount(Tasks, merge(defaultMountingOptions, overrides));
}

describe('Tasks.vue', () => {

	test('should render Tasks on mount', async () => {

		const wrapper = createWrapper(null);

		await flushPromises();

		expect(wrapper.is(Tasks)).toBe(true);
	});

	test('renders add section button', () => {

		const wrapper = createWrapper(null);

		const element = wrapper.find('#add-section-button');

		expect(element.text()).toMatch("Add section");
	})
})
