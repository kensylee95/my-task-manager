// frontend/tests/task.test.js
const fetchMock = require('fetch-mock');
const { createTask } = require('../public/app'); // Assume createTask function exists in app.js

describe('Task Creation', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('should create a task successfully', async () => {
    fetchMock.post('http://localhost:5000/api/tasks', {
      status: 201,
      body: { title: 'New Task', description: 'Task description' }
    });

    const response = await createTask('New Task', 'Task description', 'medium');
    expect(response.title).toBe('New Task');
  });
});
