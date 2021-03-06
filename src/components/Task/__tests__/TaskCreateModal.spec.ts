import { shallowMount, createLocalVue } from '@vue/test-utils'

const merge = require('lodash.merge');
// import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";

import Tasks from "../../../views/Tasks.vue";
import VueCompositionAPI from "@vue/composition-api";
import TaskCreateModal from "@/components/Task/TaskCreateModal.vue";
import Vuex from "vuex";

import TaskModule from "@/store/modules/Tasks"
import Vue from "vue";

Vue.use(Vuetify)

jest.mock("@/services/tasks.services");

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const routes = [{ path: '/tasks', component: Tasks }]

const router = new VueRouter({
	routes
})

function createStore(overrides: any) {

	const defaultStoreConfig = {
		modules: {
			Tasks: {
				namespaced: true,
				state: {
					tasks: [
						{}
					]
				},
			}
		}
	};

	return new Vuex.Store(merge(defaultStoreConfig, overrides))
}

function createWrapper(overrides: any): any {

	let vuetify = new Vuetify()

	const defaultMountingOptions = {
		localVue,
		vuetify,
		router,
	}

	const propsData = {
		taskListProp: {
			___class: "tasksLists",
			created: 1625563465103,
			id: null,
			name: null,
			objectId: "4ED7A807-709A-4DFA-B887-377E04EEB91C",
			ownerId: null,
			tasks: null,
			tasksGroupData: {
				name: "test group 1",
				tasks: [
					{
						done: true,
						title: "111",
						url: "111",
					}
				],
			},
			updated: null
		}
	}
	return shallowMount(TaskCreateModal, merge(defaultMountingOptions, propsData, overrides));
}

describe('TaskCreateModal.vue', () => {

	test('should render TaskCreateModal on mount', async () => {

		const wrapper = createWrapper(null);

		await flushPromises();

		expect(wrapper.is(TaskCreateModal)).toBe(true);
	});

	test('should have field for title', async () => {

		const wrapper = createWrapper(null);

		const element = wrapper.find('#title-text-field');

		expect(element.exists()).toBe(true);
	});

	test('should have close button', async () => {

		const wrapper = createWrapper(null);

		const element = wrapper.find('#close-button');

		expect(element.exists()).toBe(true);
	});

	test('should have submit button', async () => {

		const wrapper = createWrapper(null);

		const element = wrapper.find('#create-button');

		expect(element.exists()).toBe(true);
	});

	test('add new task should set correct task to store', async () => {

		let store = createStore(null);
		TaskModule.saveTask = jest.fn(() => Promise.resolve());

		const taskListProp = {
			___class: "tasksLists",
			created: 1625563465103,
			id: null,
			name: null,
			objectId: "4ED7A807-709A-4DFA-B887-377E04EEB91C",
			ownerId: null,
			tasks: null,
			tasksGroupData: {
				name: "test group 1",
				tasks: [
					{
						done: true,
						title: "111",
						url: "111",
					}
				],
			},
			updated: null
		};

		const wrapper = createWrapper({
			store,
			propsData: { taskListProp }
		});

		const taskName = "Test name";
		await wrapper.setData({ task: { title: taskName } });
		await flushPromises();

		const title = wrapper.find('#title-text-field');
		expect(title.attributes().value).toBe(taskName);

		const element = wrapper.find('#create-button');
		element.trigger('click');
		await flushPromises();

		expect(wrapper.vm.showDialog).toBe(false);

		expect(TaskModule.saveTask).toHaveBeenCalledWith(wrapper.vm.taskListProp);
	});

	test('save button should emit update to close the modal', async () => {

		const taskListProp = {
			___class: "tasksLists",
			created: 1625563465103,
			id: null,
			name: null,
			objectId: "4ED7A807-709A-4DFA-B887-377E04EEB91C",
			ownerId: null,
			tasks: null,
			tasksGroupData: {
				name: "test group 1",
				tasks: [
					{
						done: true,
						title: "111",
						url: "111",
					}
				],
			},
			updated: null
		};

		const wrapper = createWrapper({
			propsData: { taskListProp }
		});

		const element = wrapper.find('#create-button');
		element.trigger('click');
		await flushPromises();

		expect(wrapper.emitted('update:showDialogProp')).toBeTruthy()
	});

	test('close button should emit update to close the modal', async () => {

		const wrapper = createWrapper(null);

		const element = wrapper.find('#close-button');
		element.trigger('click');
		await flushPromises();

		expect(wrapper.emitted('update:showDialogProp')).toBeTruthy()
	});

})
