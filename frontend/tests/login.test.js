// frontend/tests/login.test.js
const fetchMock = require('fetch-mock');
const { loginUser } = require('../public/app'); // Assume loginUser function exists in app.js

describe('Login Functionality', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('should log in a user successfully', async () => {
    fetchMock.post('http://localhost:5000/api/auth/login', {
      status: 200,
      body: { token: 'test-token' }
    });

    const response = await loginUser('test@example.com', 'password123');
    expect(response.token).toBe('test-token');
  });
});
