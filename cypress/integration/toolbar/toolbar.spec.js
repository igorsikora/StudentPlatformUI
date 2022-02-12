describe('Toolbar testing', () => {
  beforeEach(() => {
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn', { userName: 'test', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })
      cy.visit('http://localhost:4200/dashboard')
    })

  it('Go to task lisk', () => {
    cy.get('[data-qa="taskList"]').click();
    cy.url().should('include', '/taskList')
  })

  it('Go to dashboard', () => {
    cy.visit('http://localhost:4200/taskList')
    cy.get('[data-qa="dashboard"]').click();
    cy.url().should('include', '/dashboard')
  })

  it('Go to calendar', () => {
    cy.get('[data-qa="calendar"]').click();
    cy.url().should('include', '/calendar')
  })

  it('Go to user', () => {
    cy.get('[data-qa="user"]').click();
    cy.url().should('include', '/user')
  })

  it('Logout', () => {
    cy.get('[data-qa="logout"]').click();
    cy.url().should('include', '/login')
  })


})
