describe("Dashboard testing", () => {
  it("should retrive data and show 3 cards", () => {
    cy.login("test", "zaq1@WSX");
    cy.intercept("https://localhost:44303/api/CalendarEvents/*").as(
      "getCalendarEvents"
    );
    cy.intercept("https://localhost:44303/api/Task/0").as("getToDoTasks");
    cy.intercept("https://localhost:44303/api/Task/1").as("getInProgressTasks");

    cy.visit("http://localhost:4200/dashboard");

    cy.wait([
      "@getCalendarEvents",
      "@getToDoTasks",
      "@getInProgressTasks",
    ]).then((httpCalls) => {
      expect(httpCalls[0].response.statusCode).to.equal(200); //getCalendarEvents
      expect(httpCalls[1].response.statusCode).to.equal(200); //getToDoTasks
      expect(httpCalls[2].response.statusCode).to.equal(200); //getInProgressTasks

      cy.get('[data-qa="calendarEvents"]').should("be.visible");
      cy.get('[data-qa="tasksToDo"]').should("be.visible");
      cy.get('[data-qa="tasksInProgress"]').should("be.visible");
    });
  });
});
