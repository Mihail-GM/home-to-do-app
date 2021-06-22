import {shallowMount, createLocalVue} from '@vue/test-utils'
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";
import TaskList from "../TaskList.vue";
import TaskListItem from "../TaskListItem.vue";
import Tasks from "../../../views/Tasks.vue";
import VueCompositionAPI from "@vue/composition-api";
import Vue from 'vue'

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const routes = [{path: '/tasks', component: Tasks}]

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

    return shallowMount(TaskList, merge(defaultMountingOptions, overrides));
}

describe('TaskList.vue', () => {

    test('should render TaskList on mount', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: false, title: "test", url: 'test'},
                        {done: true, title: "check", url: 'test'}
                    ]
                }
            }
        });

        await flushPromises();

        expect(wrapper.is(TaskList)).toBe(true);
    });

    test('should render 2 TaskListUItem component on mount', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: false, title: "test", url: 'test'}
                    ]
                }
            }
        });

        await flushPromises();

        const components = wrapper.findAllComponents(TaskListItem);

        expect(components.length).toBe(2);
    });

    test('should show progress 50%', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: true, title: "test", url: 'test'}
                    ]
                }
            }
        });

        const element = wrapper.find('#progress')

        expect(element.text()).toBe("50%");
    });

    test('should show remaining 1', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: true, title: "test", url: 'test'}
                    ]
                }
            }
        });

        const element = wrapper.find('#remaining')

        expect(element.text()).toBe("Remaining: 1");
    });

    test('should render add button with text Add task', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: true, title: "test", url: 'test'}
                    ]
                }
            }
        });

        const element = wrapper.find('#add-task-button span')

        expect(element.text()).toBe("Add task");
    });

    test('should open modal for adding task in task list', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: true, title: "test", url: 'test'}
                    ]
                }
            }
        });

        const element = wrapper.find('#add-task-button')

        element.trigger('click');
        await flushPromises();

        expect(wrapper.emitted().openAddTaskModal).toBeTruthy()
    });

    test('should render more option icon', async () => {

        const wrapper = createWrapper({
            propsData: {
                taskListProp: {
                    name: "task group 1",
                    tasks: [
                        {done: false, title: 'test', url: 'test'},
                        {done: true, title: "test", url: 'test'}
                    ]
                }
            }
        });

        const element = wrapper.find('#more-option-button');

        expect(element.exists()).toBe(true);
    });
})
