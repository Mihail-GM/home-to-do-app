import { shallowMount, createLocalVue } from '@vue/test-utils'
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";
import TaskListItem from "../TaskListItem.vue"
import Vue from "vue";

Vue.use(Vuetify)

const localVue = createLocalVue();

const routes = [{ path: '/dashboard', component: Home }]

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

	return shallowMount(TaskListItem, merge(defaultMountingOptions, overrides));
}

describe('TaskListItem.vue', () => {

	test('should render TaskListItem on mount', async () => {

		const taskProp = {
			url: 'http://some-url.com',
			title: 'some-title',
			done: false
		};
		const wrapper = createWrapper({
			propsData: { taskProp }
		});

		await flushPromises();

		expect(wrapper.is(TaskListItem)).toBe(true);
	});

	test('renders a empty check box when done is false', async () => {

		const taskProp = {
			url: 'http://some-url.com',
			title: 'some-title',
			done: false
		};
		const wrapper = createWrapper({
			propsData: { taskProp }
		});

		await flushPromises();

		const element = wrapper.find('#done-checkbox');

		expect(element.attributes().inputvalue).toBe(undefined)
	});

	test('renders a checked check box when done is true', async () => {

		const taskProp = {
			url: 'http://some-url.com',
			title: 'some-title',
			done: true
		};
		const wrapper = createWrapper({
			propsData: { taskProp }
		});

		await flushPromises();

		const element = wrapper.find('#done-checkbox');

		expect(element.attributes().inputvalue).toBe("true");

	})
})
