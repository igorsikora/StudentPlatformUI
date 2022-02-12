
describe('User testing', () => {
  beforeEach(() => {
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn',
    { userName: 'test', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })
      cy.visit('http://localhost:4200/user')
  })

  it('Change user details', () => {
    const randomNumber = (Math.floor(Math.random() * (999 - 1 + 1)) + 1).toString();
    cy.get('[data-qa="userName"]').type('cypressUser' + randomNumber)
    cy.get('[data-qa="firstName"]').type('cypress')
    cy.get('[data-qa="lastName"]').type('User')

    cy.get('[data-qa="submit"]').click()
  })

  it('Change user email', () => {
    cy.get('[data-qa="changeEmail"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalEmail"]').type('newEmailCypress@cypress.com')
    cy.get('[data-qa="modalConfirmEmail"]').type('newEmailCypress@cypress.com')
    cy.get('[data-qa="modalSubmit"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("not.exist");
  })

  it('Open email change modal', () => {
    cy.get('[data-qa="changeEmail"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalCancel"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("not.exist");
  })

  it('Change user password', () => {
    cy.get('[data-qa="changePassword"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalOldPassword"]').type('zaq1@WSX')
    cy.get('[data-qa="modalPassword"]').type('xsw2#EDC')
    cy.get('[data-qa="modalConfirmPassword"]').type('xsw2#EDC')
    cy.get('[data-qa="modalSubmit"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("not.exist");
  })

  it('Open password change modal', () => {
    cy.get('[data-qa="changePassword"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalCancel"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("not.exist");
  });


})
