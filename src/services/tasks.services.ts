import $axios from '../plugins/axios'
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

    addTask(data: TasksModel) {

        return $axios.post(`/data/tasks`, data)
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
