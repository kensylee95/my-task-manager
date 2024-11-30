// frontend/cypress/support/commands.js
Cypress.Commands.add('login', () => {
    cy.request('POST', 'http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
  });
  