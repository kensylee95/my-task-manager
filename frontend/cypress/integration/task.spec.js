// frontend/cypress/integration/task.spec.js
describe('Task Management', () => {
    before(() => {
      cy.login(); // Custom Cypress command to log in
    });
  
    it('should create a new task', () => {
      cy.visit('/tasks');
      cy.get('#taskTitle').type('New Task');
      cy.get('#taskDescription').type('Task description');
      cy.get('#taskPriority').select('medium');
      cy.get('button[type="submit"]').click();
  
      cy.contains('New Task');
    });
  
    it('should delete a task', () => {
      cy.get('.task-delete-button').first().click();
      cy.contains('Task deleted successfully');
    });
  });
  