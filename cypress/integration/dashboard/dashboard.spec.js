
describe('Dashboard testing', () => {
  beforeEach(() => {
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn', { userName: 'test', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })
  })

  it('Should show 3 cards', () => {
    cy.visit('http://localhost:4200/dashboard')
    cy.get('[data-qa="calendarEvents"]').should('be.visible');
    cy.get('[data-qa="tasksToDo"]').should('be.visible');
    cy.get('[data-qa="tasksInProgress"]').should('be.visible');
  })


})
