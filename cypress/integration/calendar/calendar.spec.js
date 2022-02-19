describe("Calendar testing", () => {
  //ToDo check those tests
  beforeEach(() => {
    cy.login("test", "zaq1@WSX");
    cy.visit("http://localhost:4200/calendar");
  });

  it("should be able to change dates", () => {
    // title is connect to component data controlling dates
    cy.intercept("https://localhost:44303/api/CalendarEvents/*").as(
      "getCalendarEvents1"
    );
    let date = new Date();
    let longMonth = date.toLocaleString("pl-PL", {
      year: "numeric",
      month: "long",
    });
    cy.get('[data-qa="date"]').should("have.text", longMonth);

    cy.get('[data-qa="prevView"]').click();
    cy.wait(["@getCalendarEvents1"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      date.setMonth(date.getMonth() - 1);
      longMonth = date.toLocaleString("pl-PL", {
        year: "numeric",
        month: "long",
      });
      cy.get('[data-qa="date"]').should("have.text", longMonth);
    });

    cy.intercept("https://localhost:44303/api/CalendarEvents/*").as(
      "getCalendarEvents2"
    );
    cy.get('[data-qa="todayView"]').click();
    cy.wait(["@getCalendarEvents2"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      longMonth = new Date().toLocaleString("pl-PL", {
        year: "numeric",
        month: "long",
      });
      cy.get('[data-qa="date"]').should("have.text", longMonth);
    });

    cy.intercept("https://localhost:44303/api/CalendarEvents/*").as(
      "getCalendarEvents3"
    );
    cy.get('[data-qa="nextView"]').click();
    cy.wait(["@getCalendarEvents3"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      date.setMonth(date.getMonth() + 2);
      longMonth = date.toLocaleString("pl-PL", {
        year: "numeric",
        month: "long",
      });
      cy.get('[data-qa="date"]').should("have.text", longMonth);
    });
  });

  it("should be able to switch calendar views", () => {
    cy.get('[data-qa="showDayView"]').then(($showDayView) => {
      $showDayView.click();
      const formatOption = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let formatedDate = new Date().toLocaleString("pl-PL", formatOption);

      // Assert
      cy.get('[data-qa="dayView"]').should("be.visible");
      cy.get('[data-qa="date"]').should("have.text", formatedDate);
    });

    cy.get('[data-qa="showWeekView"]').then(($showWeekView) => {
      $showWeekView.click();
      const daysInWeek = 7;
      const startDateformatOption = { day: "numeric", month: "short" };
      const endDateformatOption = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      let endDay = new Date();
      endDay.setDate(endDay.getDate() + daysInWeek - 1); // -1 since we count first day as days in week
      let formatedStartDate = new Date().toLocaleString(
        "pl-PL",
        startDateformatOption
      );
      let formatedEndDate = endDay.toLocaleString("pl-PL", endDateformatOption);
      const dayString = `${formatedStartDate} - ${formatedEndDate}`;

      cy.get('[data-qa="weekView"]').should("be.visible");
      cy.get('[data-qa="date"]').should("have.text", dayString);
    });

    cy.get('[data-qa="showMonthView"]').then(($showMonthView) => {
      $showMonthView.click();
      const formatOption = {
        year: "numeric",
        month: "long",
      };
      let formatedDate = new Date().toLocaleString("pl-PL", formatOption);

      // Assert
      cy.get('[data-qa="monthView"]').should("be.visible");
      cy.get('[data-qa="date"]').should("have.text", formatedDate);
    });
  });

  it("should perform CRUD operation on CalendarEvent", () => {
    //Create
    cy.intercept("https://localhost:44303/api/CalendarEvents").as(
      "postCalendarEvents"
    );
    cy.intercept("https://localhost:44303/api/Task").as("postTaskFromCalendar");

    cy.get('[data-qa="showDayView"]').then(($showDayView) => {
      $showDayView.click();
      cy.get('[data-qa="dayView"]').should("be.visible");

      cy.get(".cal-hour", { force: true }).first().click();
      cy.get(".mat-dialog-container", { timeout: 10000 }).should("be.visible");
      cy.get('[data-qa="modalTitle"]').type("cypress calendar event");
      cy.get('[data-qa="modalDescription"]').type(
        "cypress calendar event desciption"
      );
      //mat-checkbox is a child element need to select via child
      cy.get("#mat-checkbox-1-input").click({ force: true });

      cy.get('[data-qa="modalSubmit"]').click();
``
      cy.wait(["@postCalendarEvents", "@postTaskFromCalendar"]).then(
        (httpCalls) => {
          expect(httpCalls[0].response.statusCode).to.equal(201);
          expect(httpCalls[1].response.statusCode).to.equal(201);
        }
      );
      cy.get("[data-qa='modalBody']", { timeout: 10000 }).should("not.exist");
    });

    //Update
    cy.intercept("PUT", "https://localhost:44303/api/CalendarEvents").as(
      "putCalendarEvents"
    );
    cy.get('[data-qa="calendarEventTitle"]')
      .first()
      .then(($title) => {
        $title.click();

        cy.get("[data-qa='modalBody']", { timeout: 10000 }).then(() => {
          cy.get('[data-qa="modalTitle"]')
            .clear()
            .type("cypress calendar event");
          cy.get('[data-qa="modalDescription"]')
            .clear()
            .type("cypress calendar event desciption");
          cy.get('[data-qa="modalSubmit"]').click();
          cy.wait(["@putCalendarEvents"]).then((httpCalls) => {
            expect(httpCalls.response.statusCode).to.equal(204);
          });
          cy.get("[data-qa='modalBody']", { timeout: 10000 }).should(
            "not.exist"
          );
        });
      });

    //Delete
    cy.intercept("DELETE", "https://localhost:44303/api/CalendarEvents/*").as(
      "deleteCalendarEvents"
    );

    cy.get('[data-qa="calendarEventTitle"]')
      .first()
      .then(($title) => {
        $title.click();
        cy.get("[data-qa='modalBody']", { timeout: 10000 }).then(() => {
          cy.get('[data-qa="modalDelete"]').click();
          cy.wait(["@deleteCalendarEvents"]).then((httpCalls) => {
            expect(httpCalls.response.statusCode).to.equal(204);
          });
          cy.get("[data-qa='modalBody']", { timeout: 10000 }).should(
            "not.exist"
          );
        });
      });
  });
});
