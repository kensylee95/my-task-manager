// backend/tests/task.test.js
const request = require('supertest');
const app = require('../app');
const Task = require('../models/task');
const User = require('../models/User');
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task Routes', () => {
  let token;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    token = await generateAccessToken(user);
  });

  test('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', token)
      .send({ title: 'Test Task', description: 'Task description', priority: 'medium' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  test('should fetch all tasks for a user', async () => {
    await Task.create({
      title: 'Test Task',
      description: 'Task description',
      priority: 'medium',
      userId: user.id
    });
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
