// @ts-ignore
import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import TasksModel from "@/models/interfaces/TasksModel";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({});

// @ts-ignore
@Module({name: "Tasks", dynamic: true, namespaced: true, store})
class Tasks extends VuexModule {
    tasks = [] as TasksModel[];

    get getTasks() {
        return this.tasks;
    }

    @Mutation
    private setNewTask(data: TasksModel): void {
        this.tasks.push(data);
    }

    @Action
    public saveTask(data: TasksModel): void {
        this.setNewTask(data);
    }
}

export default getModule(Tasks);
