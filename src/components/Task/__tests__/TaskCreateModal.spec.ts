import {shallowMount, createLocalVue} from '@vue/test-utils'
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";

import Tasks from "../../../views/Tasks.vue";
import VueCompositionAPI, {computed, ref} from "@vue/composition-api";
import TasksModel from "@/models/interfaces/TasksModel";
import TaskCreateModal from "@/components/Task/TaskCreateModal.vue";
import Vuex from "vuex";

import TaskModule from "@/store/modules/Tasks"
import Vue from "vue";

Vue.use(Vuetify)

jest.mock("@/services/tasks.services");

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

const routes = [{path: '/tasks', component: Tasks}]

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

    const dataOptions = {
        setup() {

            const tasks = ref<TasksModel[]>([
                {done: false, title: 'test', url: 'test'},
                {done: true, title: "check", url: 'test'},
            ]);

            const numberCompletedTasks = computed(() => {
                return tasks.value.filter(task => task.done).length;
            });

            const progressOfTasks = computed(() => {
                return numberCompletedTasks.value / tasks.value.length * 100;
            });

            const remainingTasks = computed(() => {
                return tasks.value.length - numberCompletedTasks.value;
            });

            return {
                tasks,
                numberCompletedTasks,
                progressOfTasks,
                remainingTasks
            }
        }
    }

    return shallowMount(TaskCreateModal, merge(defaultMountingOptions, dataOptions, overrides));
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

        const wrapper = createWrapper({
            store
        });

        const taskName = "Test name";
        await wrapper.setData({task : {title: taskName}});
        await flushPromises();

        const title = wrapper.find('#title-text-field');
        expect(title.attributes().value).toBe(taskName);

        const element = wrapper.find('#create-button');
        element.trigger('click');
        await flushPromises();

        expect(TaskModule.saveTask).toHaveBeenCalledWith( {
            done: false,
            title: taskName,
            url: 'test',
        });
    });
})
