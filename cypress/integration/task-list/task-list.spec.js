
describe('Task list testing', () => {
  beforeEach(() => {
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn',
    { userName: 'test', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })
      cy.visit('http://localhost:4200/taskList')
  })

  it('Should show 3 columns', () => {
    cy.get('[data-qa="toDoPanel"]').should('be.visible')
    cy.get('[data-qa="inProgressPanel"]').should('be.visible')
    cy.get('[data-qa="donePanel"]').should('be.visible')
  })

  it('Add new task', () => {
    const randomNumber = (Math.floor(Math.random() * (999 - 1 + 1)) + 1).toString();
    const cypressTitle = "cypress" + randomNumber;
    cy.get('[data-qa="taskTitle"]').type(cypressTitle.toString())
    cy.get('[data-qa="addTask"]').click()

    cy.intercept('https://localhost:44303/api/Task/*').as('getToDoTasks')
    cy.wait(['@getToDoTasks'])
    cy.get('[data-qa="toDoTask"]').last().should('have.text', cypressTitle)
  });
})
