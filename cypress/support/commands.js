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


Cypress.Commands.add("drag", (drag, drop) => {

  cy.get(drag, {force: true}).should('exist')
  .then($target => {
    let coords = $target[0].getBoundingClientRect();
    const draggable = $target[0];
    cy.get(drop).should('exist').then($drop => {
      let dropCoords = $drop[0].getBoundingClientRect();
      draggable.dispatchEvent(new MouseEvent("mousedown"));
      draggable.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: coords.left,
          clientY: coords.top,
        })
        );
        draggable.dispatchEvent(
          new MouseEvent("mousemove", {
            clientX: dropCoords.left,
            clientY: dropCoords.top,
          })
          );
          draggable.dispatchEvent(

            new MouseEvent("mouseup", {
              clientX: dropCoords.left,
              clientY: dropCoords.top,
            }));
          });
        });
        return cy.get(drop);
})

