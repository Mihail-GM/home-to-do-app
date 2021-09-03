import TasksModel from "./TasksModel"

export interface TasksListInfoModel {
    name: string,
    tasks: TasksModel [],
}

export interface TasksListEntityModel {
    name: string,
    room_id: number,
    tasksGroupData: TasksListInfoModel,
}
