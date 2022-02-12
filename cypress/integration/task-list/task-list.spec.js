
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
    cy.intercept('https://localhost:44303/api/Task/0').as('getToDoTasks')
    const randomNumber = (Math.floor(Math.random() * (999 - 1 + 1)) + 1).toString();
    const cypressTitle = "cypress" + randomNumber;
    cy.get('[data-qa="taskTitle"]').clear().type(cypressTitle.toString())
    cy.get('[data-qa="addTask"]').click()

    cy.wait(['@getToDoTasks'])
    cy.get('[data-qa="toDoTask"]').last().should('have.text', cypressTitle, {force: true})
  })

   it('Move task to Done', () => {
      cy.drag('[data-qa="toDoTask"]:last-child', '#cdk-drop-list-2', {timeout: 3000})
      .should("have.length", '1')
   })

  it('Clear all done tasks', () => {
    cy.intercept('https://localhost:44303/api/Task').as('clearAllDoneTasksReq')

    cy.get('[data-qa="clearAllDoneTasks"]').click()

    cy.wait(['@clearAllDoneTasksReq'])
    cy.get('[data-qa="doneTask"]').should("have.length", 0)

  })
})
