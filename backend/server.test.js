const SERVER_API_URL = 'http://localhost:3000';

async function fetchApi(url, method = 'GET', body = null, shouldParseResponse = true) {
    const response = await fetch(`${SERVER_API_URL}${url}`, {
        method,
        body: body != null ? JSON.stringify(body) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (shouldParseResponse) {
        return await response.json();
    }
}

describe('api', () => {
    test('should create new task', async () => {
        const newTask = {
            title: 'new task',
            description: 'to do this important task',
            priority: 'high',
            dueDate: '2029-04-01',
        }

        const {id} = await fetchApi('/api/tasks', 'POST', newTask);
        const allTasks = await fetchApi('/api/tasks');
        const createdTask = allTasks.find(task => task.id === id);

        expect(createdTask).not.toBeNull();
        expect(createdTask.title).toEqual(newTask.title);
        expect(createdTask.description).toEqual(newTask.description);
        expect(createdTask.priority).toEqual(newTask.priority);
        expect(createdTask.dueDate).toEqual(newTask.dueDate);
    })

    test('should update task', async () => {
        //creating the task that will be deleted
        const oldTask = {
            title: 'old task',
            description: 'to do this important task',
            priority: 'high',
            dueDate: '2029-04-01',
        }
        const newTask = {
            completed: true,
            title: 'new task',
            description: 'to do this important task',
            priority: 'low',
            dueDate: '2030-04-01',
        }

        const {id} = await fetchApi('/api/tasks', 'POST', oldTask);
        await fetchApi(`/api/tasks/${id}`, 'PUT', newTask);
        const allTasks = await fetchApi('/api/tasks');
        const updatedTask = allTasks.find(task => task.id === id);

        expect(updatedTask).not.toBeNull();
        expect(updatedTask.title).toEqual(newTask.title);
        expect(updatedTask.description).toEqual(newTask.description);
        expect(updatedTask.priority).toEqual(newTask.priority);
        expect(updatedTask.dueDate).toEqual(newTask.dueDate);
    })

    })
});