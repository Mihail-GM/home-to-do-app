import {shallowMount, RouterLinkStub, createLocalVue, mount} from '@vue/test-utils'
// @ts-ignore
import merge from "lodash.merge"
// @ts-ignore
import VueRouter from "vue-router";
import Vuetify from 'vuetify'
import flushPromises from "flush-promises";
import TaskList from "../TaskList.vue";
import TaskListItem from "../TaskListItem.vue";
import Tasks from "../../../views/Tasks.vue";
import VueCompositionAPI, {computed, ref} from "@vue/composition-api";
import TasksModel from "@/models/interfaces/TasksModel";

const localVue = createLocalVue();
localVue.use(Vuetify);
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

    return shallowMount(TaskList, merge(defaultMountingOptions, dataOptions, overrides));
}

describe('TaskList.vue', () => {

    let vuetify: Vuetify

    beforeEach(() => {

        vuetify = new Vuetify();
    });

    test('should render TaskList on mount', async () => {

        const wrapper = createWrapper({
            vuetify
        });

        await flushPromises();

        expect(wrapper.is(TaskList)).toBe(true);
    });

    test('should render 2 TaskListUItem component on mount', async () => {

        const wrapper = createWrapper({
            vuetify
        });

        await flushPromises();

        const components = wrapper.findAllComponents(TaskListItem);

        expect(components.length).toBe(2);
    });

    test('should show progress 50%', async () => {

        const wrapper = createWrapper({
            vuetify
        });

        const element = wrapper.find('#progress')

        expect(element.text()).toBe("50%");
    });

    test('should show remaining 1', async () => {

        const wrapper = createWrapper({
            vuetify
        });

        const element = wrapper.find('#remaining')

        expect(element.text()).toBe("Remaining: 1");
    });

})
