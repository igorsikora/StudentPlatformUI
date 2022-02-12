describe('Register testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  })

  it('Login user', () => {
    cy.get('[data-qa="login"]').type('test')
    cy.get('[data-qa="password"]').type('zaq1@WSX')
    cy.get('[data-qa="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('Go to registration page', () => {
    cy.get('[data-qa="goToRegister"]').click()

    cy.url().should('include', '/register')
  })
})
