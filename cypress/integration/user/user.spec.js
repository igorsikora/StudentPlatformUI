describe("User testing", () => {
  it("should change user info", () => {
    const username =
      "UserTest" + Math.floor(Math.random() * 999 + 1).toString();

    cy.request("POST", "https://localhost:44303/api/Auth/SignUp", {
      userName: username,
      password: "zaq1@WSX",
      email: "user@user.pl",
      firstname: "user",
      lastname: "user",
    }).then(() => {
      cy.login(username, "zaq1@WSX");
    });

    cy.visit("http://localhost:4200/user");

    cy.intercept("PUT", "https://localhost:44303/api/User/Detail").as(
      "userDetail"
    );
    cy.intercept("PUT", "https://localhost:44303/api/User/Email").as(
      "userEmail"
    );
    cy.intercept("PUT", "https://localhost:44303/api/User/Password").as(
      "userPassword"
    );
    const randomNumber = Math.floor(Math.random() * 999 + 1);

    cy.get('[data-qa="userName"]')
      .clear()
      .type("cypressUser" + randomNumber.toString());
    cy.get('[data-qa="firstName"]').clear().type("cypress");
    cy.get('[data-qa="lastName"]').clear().type("User");
    cy.get('[data-qa="submit"]').click();

    cy.wait("@userDetail").then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(204);
    });

    cy.get('[data-qa="changeEmail"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalEmail"]')
      .clear()
      .type("newEmailCypress@cypress.com");
    cy.get('[data-qa="modalConfirmEmail"]')
      .clear()
      .type("newEmailCypress@cypress.com");
    cy.get('[data-qa="modalSubmit"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("not.exist");

    cy.wait("@userEmail").then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(204);
    });

    cy.get('[data-qa="changePassword"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalOldPassword"]').clear().type("zaq1@WSX");
    cy.get('[data-qa="modalPassword"]').clear().type("xsw2#EDC");
    cy.get('[data-qa="modalConfirmPassword"]').type("xsw2#EDC");
    cy.get('[data-qa="modalSubmit"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("not.exist");

    cy.wait("@userPassword").then((httpCalls) => {
      console.log(httpCalls);
      expect(httpCalls.response.statusCode).to.equal(204);
    });
  });

  it("should open and close modals", () => {
    cy.login("test", "zaq1@WSX");
    cy.visit("http://localhost:4200/user");

    cy.get('[data-qa="changeEmail"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalCancel"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("not.exist");

    cy.get('[data-qa="changePassword"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalCancel"]').click();
    cy.get(".mat-dialog-container", { timeout: 10000 }).should("not.exist");
  });
});
