const { cy } = require("date-fns/locale");

describe("Task list testing", () => {
  beforeEach(() => {
    cy.login("test", "zaq1@WSX");
  });

  it("should send 3 requests to populate panels", () => {
    cy.intercept("https://localhost:44303/api/Task/0").as("getToDoTasks");
    cy.intercept("https://localhost:44303/api/Task/1").as("getInProgressTasks");
    cy.intercept("https://localhost:44303/api/Task/2").as("getDoneTasks");
    cy.visit("http://localhost:4200/taskList");

    cy.wait(["@getToDoTasks", "@getInProgressTasks", "@getDoneTasks"]).then(
      (httpCalls) => {
        expect(httpCalls[0].response.statusCode).to.equal(200); //getToDoTasks
        expect(httpCalls[1].response.statusCode).to.equal(200); //getInProgressTasks
        expect(httpCalls[2].response.statusCode).to.equal(200); //getDoneTasks

        cy.get('[data-qa="toDoPanel"]').should("be.visible");
        cy.get('[data-qa="inProgressPanel"]').should("be.visible");
        cy.get('[data-qa="donePanel"]').should("be.visible");
      }
    );
  });
  it("should delete single task", () => {
    cy.visit("http://localhost:4200/taskList");

    cy.intercept("POST", "https://localhost:44303/api/Task").as("postTask");
    cy.intercept("DELETE", "https://localhost:44303/api/Task/*").as(
      "deleteTask")

          //Create

    const randomNumber = Math.floor(Math.random() * 999 + 1).toString();
    const cypressTitle = "cypress" + randomNumber;
    cy.get('[data-qa="taskTitle"]').clear().type(cypressTitle.toString());
    cy.get('[data-qa="addTask"]').click();

    cy.wait(["@postTask"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(201);
    });

    cy.get('[data-qa="taskDelete"').click()
    cy.wait(["@deleteTask"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(204);
    });

  })
  it("should perfom CRUD operations on Tasks", () => {
    cy.intercept("https://localhost:44303/api/Task/2").as("getDoneTasks");

    cy.visit("http://localhost:4200/taskList");

    cy.intercept("POST", "https://localhost:44303/api/Task").as("postTask");
    cy.intercept("GET", "https://localhost:44303/api/Task/0").as(
      "getToDoTasks"
    );
    cy.intercept("PUT", "https://localhost:44303/api/Task").as("putTask");
    cy.intercept("DELETE", "https://localhost:44303/api/Task").as(
      "deleteTasks"
    );

    cy.wait(["@getDoneTasks"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      cy.get('[data-qa="donePanel"]').children().as("donePanelStart");
    });

    //Create

    const randomNumber = Math.floor(Math.random() * 999 + 1).toString();
    const cypressTitle = "cypress" + randomNumber;
    cy.get('[data-qa="taskTitle"]').clear().type(cypressTitle.toString());
    cy.get('[data-qa="addTask"]').click();

    cy.wait(["@postTask"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(201);
    });

    //Read
    cy.wait(["@getToDoTasks"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(200);
      expect(cypressTitle).to.equal(
        httpCalls.response.body[httpCalls.response.body.length - 1].title
      );
    });

    //Update
    cy.dragAndDrop('[data-qa="toDoTask"]', '[data-qa="donePanel"]', {
      timeout: 3000,
    }).then(() => {});

    cy.wait(["@putTask"]).then((httpCalls) => {
      expect(httpCalls.response.statusCode).to.equal(204);
      cy.get("@donePanelStart").then((donePanelStart) => {
        cy.get('[data-qa="donePanel"]')
          .children()
          .should("have.length", donePanelStart.length + 1); //header and dropped task
      });
    });

    //Delete
    cy.get('[data-qa="clearAllDoneTasks"]').then(($btn) => {
      $btn.click();
      cy.wait(["@deleteTasks"]).then((httpCalls) => {
        expect(httpCalls.response.statusCode).to.equal(204);
        cy.get('[data-qa="doneTask"]').should("have.length", 0);
      });
    });
  });
});
