describe("Register testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/auth/login");
  });

  it("should login user", () => {
    cy.intercept("https://localhost:44303/api/Auth/*").as("signin");
    cy.get('[data-qa="login"]').clear().type("test");
    cy.get('[data-qa="password"]').clear().type("zaq1@WSX");
    cy.get('[data-qa="submit"]').click();

    cy.wait(["@signin"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      expect(localStorage.getItem("token")).to.equal(httpCalls.response.body);
      cy.url().should("include", "/dashboard");
    });
  });

  it("should navigate to registration page", () => {
    cy.get('[data-qa="goToRegister"]').click();

    cy.url().should("include", "/auth/register");
  });
});
