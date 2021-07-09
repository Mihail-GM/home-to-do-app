import TasksModel from "./TasksModel"

export interface TasksListInfoModel {
    name: string,
    tasks: TasksModel [],
}

export interface TasksListEntityModel {
    tasksGroupData: TasksListInfoModel
}
