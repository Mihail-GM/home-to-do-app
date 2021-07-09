import $axios from '../plugins/axios'
import { TasksListEntityModel } from "@/models/interfaces/TasksListInfoModel";

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

		return $axios.get(`/data/tasksLists?where=room_id.id%3D${id}`)
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

}

export default new TaskService();
