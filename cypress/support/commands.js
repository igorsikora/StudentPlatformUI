// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (login, password) => {
  cy.request("POST", "https://localhost:44303/api/Auth/SignIn", {
    userName: login,
    password: password,
  })
    .its("body")
    .then((body) => {
      localStorage.setItem("token", body);
    });
});

Cypress.Commands.add("dragAndDrop", (dragSelector, dropSelector) => {
  cy.get(dropSelector).then(($drop) => {
    cy.get(dragSelector, { force: true }).then(($drag) => {
      const dragAndDropElement = $drag[$drag.length - 1];
      let dragBox = $drag[$drag.length - 1].getBoundingClientRect();
      let dropBox = $drop[$drop.length - 1].getBoundingClientRect();
      dragAndDropElement.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: dragBox.left + 1,
          clientY: dragBox.top,
        })
      );
      dragAndDropElement.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: dragBox.left + dragBox.width / 2,
          clientY: dragBox.top + dragBox.height / 2,
        })
      );
      dragAndDropElement.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: dropBox.left + dropBox.width / 2,
          clientY: dropBox.top + dropBox.height / 2,
        })
      );
      dragAndDropElement.dispatchEvent(
        new MouseEvent("mouseup", {
          clientX: dropBox.left + dropBox.width / 2,
          clientY: dropBox.top + dropBox.height / 2,
        })
      );
    });
  });
});
