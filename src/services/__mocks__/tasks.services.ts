class TaskService {

    addTask = jest.fn((data) => Promise.resolve(data))
}

export default new TaskService();
