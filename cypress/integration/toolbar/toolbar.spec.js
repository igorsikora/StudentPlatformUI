describe("Toolbar testing", () => {
  it("Should navigate through navbar", () => {
    cy.login("test", "zaq1@WSX");
    cy.visit("http://localhost:4200/dashboard");

    cy.get('[data-qa="taskList"]').click();
    cy.url().should("include", "/taskList");

    cy.get('[data-qa="dashboard"]').click();
    cy.url().should("include", "/dashboard");

    cy.get('[data-qa="calendar"]').click();
    cy.url().should("include", "/calendar");

    cy.get('[data-qa="user"]').click();
    cy.url().should("include", "/user");

    cy.get('[data-qa="logout"]').then(($logoutBtn) => {
      $logoutBtn.click();
      cy.url().should("include", "/auth/login");
      expect(localStorage.getItem("token")).to.be.null;
    });
  });
});
