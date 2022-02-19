describe("Register testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/auth/register");
  });

  it("should register new user", () => {
    cy.intercept("https://localhost:44303/api/Auth/*").as("signUp");
    const randomNumber = Math.floor(Math.random() * 999 + 1).toString();

    cy.get('[data-qa="login"]')
      .clear()
      .type("test" + randomNumber);
    cy.get('[data-qa="email"]')
      .clear()
      .type("test" + randomNumber + "@test.pl");
    cy.get('[data-qa="firstName"]').clear().type("testFirstName");
    cy.get('[data-qa="lastName"]').clear().type("testLastName");
    cy.get('[data-qa="password"]').clear().type("zaq1@WSX");
    cy.get('[data-qa="confirmPassword"]').clear().type("zaq1@WSX");
    cy.get('[data-qa="submit"]').click();

    cy.wait(["@signUp"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(201);
      cy.url().should("include", "/auth/login");
    });
  });

  it("should navigate to login page", () => {
    cy.get('[data-qa="goToLogin"]').click();

    cy.url().should("include", "/auth/login");
  });
});
