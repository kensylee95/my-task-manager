// frontend/cypress/integration/auth.spec.js
describe('Authentication Flow', () => {
    it('should register a new user', () => {
      cy.visit('/register');
      cy.get('#registerUsername').type('testuser');
      cy.get('#registerEmail').type('test@example.com');
      cy.get('#registerPassword').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Logged in successfully');
    });
  
    it('should log in an existing user', () => {
      cy.visit('/login');
      cy.get('#loginEmail').type('test@example.com');
      cy.get('#loginPassword').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Your Tasks');
    });
  });
  