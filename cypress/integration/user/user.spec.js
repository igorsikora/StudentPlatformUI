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

        // changing auth info so we use different seed
        localStorage.clear();
        cy.request('POST', 'https://localhost:44303/api/Auth/SignIn',
        { userName: 'changeUserName', password: 'zaq1@WSX' })
          .its('body')
          .then((body) => {
            localStorage.setItem("token", body)
          })
    cy.get('[data-qa="userName"]').clear().type('cypressUser' + randomNumber)
    cy.get('[data-qa="firstName"]').clear().type('cypress')
    cy.get('[data-qa="lastName"]').clear().type('User')
    cy.get('[data-qa="submit"]').click()
  })

  it('Change user email', () => {
    cy.get('[data-qa="changeEmail"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalEmail"]').clear().type('newEmailCypress@cypress.com')
    cy.get('[data-qa="modalConfirmEmail"]').clear().type('newEmailCypress@cypress.com')
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
    // changing auth info so we use different seed
    localStorage.clear();
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn',
    { userName: 'changePasswordUser', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })

    cy.intercept('https://localhost:44303/api/Auth/*').as('authRequest')
    cy.get('[data-qa="changePassword"]').click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalOldPassword"]').clear().type('zaq1@WSX')
    cy.get('[data-qa="modalPassword"]').clear().type('xsw2#EDC')
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
