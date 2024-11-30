// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });  // Clear and set up database before tests
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Routes', () => {
  test('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should not register with an existing email', async () => {
    await User.create({
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'password123'
    });
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser2',
      email: 'existing@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  test('should login an existing user', async () => {
    const user = await User.create({
      username: 'loginuser',
      email: 'login@example.com',
      password: await bcrypt.hash('password123', 10)
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
