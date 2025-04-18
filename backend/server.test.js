const SERVER_API_URL = 'http://localhost:3000';

async function fetchApi(url, method = 'GET', body = null) {
    const response = await fetch(`${SERVER_API_URL}${url}`, {
        method,
        body: body != null ? JSON.stringify(body) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
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
});