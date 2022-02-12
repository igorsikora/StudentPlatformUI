describe('Register testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/register')
  })

  it('Register new user', () => {
    const randomNumber = (Math.floor(Math.random() * (999 - 1 + 1)) + 1).toString();

    cy.get('[data-qa="login"]').type('test' + randomNumber)
    cy.get('[data-qa="email"]').type('test' + randomNumber + "@test.pl")
    cy.get('[data-qa="firstName"]').type('testFirstName')
    cy.get('[data-qa="lastName"]').type('testLastName')

    cy.get('[data-qa="password"]').type('zaq1@WSX')
    cy.get('[data-qa="confirmPassword"]').type('zaq1@WSX')
    cy.get('[data-qa="submit"]').click()

    cy.url().should('include', '/login')
  })

  it('Go to login page', () => {
    cy.get('[data-qa="goToLogin"]').click()

    cy.url().should('include', '/login')
  })
})
