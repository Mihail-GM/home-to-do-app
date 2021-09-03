import $axios from '../plugins/axios'
import { TasksListEntityModel } from "@/models/interfaces/TasksListInfoModel";
import TasksModel from "@/models/interfaces/TasksModel";

class TaskService {

	getTask(id: number) {

		return $axios.get(`/task/${id}`)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	getAllTasksGroup() {

		return $axios.get(`/data/tasksLists`)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	getAllTasksGroupForRoom(id: string) {

		return $axios.get(`/data/tasksLists?where=room_id%3D'${id}'`)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	addTask(data: TasksListEntityModel) {

		return $axios.put(`/data/tasksLists`, data)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	deleteTask(objectId: string) {

		return $axios.delete(`/data/tasksLists`, {
			data: {
				objectId
			}
		})
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	addTaskList(data: TasksListEntityModel) {

		return $axios.put(`/data/tasksLists`, data)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	addTaskListRoom(data: TasksModel, roomId: any) {

		return $axios.put(`/data/tasksLists/${data.objectId}/room_id`, [roomId])
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}
}

export default new TaskService();
