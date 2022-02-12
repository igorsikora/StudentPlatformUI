
describe('Calendar testing', () => {
  beforeEach(() => {
    cy.request('POST', 'https://localhost:44303/api/Auth/SignIn',
    { userName: 'test', password: 'zaq1@WSX' })
      .its('body')
      .then((body) => {
        localStorage.setItem("token", body)
      })
      cy.visit('http://localhost:4200/calendar')
  })

  it('show previous date', () => {
    cy.intercept('https://localhost:44303/api/CalendarEvents/*').as('getCalendarEvents')
    let date = new Date()
    let longMonth = date.toLocaleString('pl-PL', { month: 'long' });
    cy.get('[data-qa="date"]').contains(longMonth).should('exist')

    cy.get('[data-qa="prevView"]').click()
    cy.wait(['@getCalendarEvents'])
    date.setMonth((date.getMonth() - 1))
    longMonth = date.toLocaleString('pl-PL', { month: 'long' });
    console.log(date);
    cy.get('[data-qa="date"]').contains(longMonth).should('exist')

  })

  it('show today date', () => {
    cy.intercept('https://localhost:44303/api/CalendarEvents/*').as('getCalendarEvents')
    cy.get('[data-qa="prevView"]').click()
    cy.wait(['@getCalendarEvents'])
    cy.get('[data-qa="todayView"]').click()
    cy.wait(['@getCalendarEvents'])
    let longMonth = new Date().toLocaleString('pl-PL', { month: 'long' });
    cy.get('[data-qa="date"]').contains(longMonth).should('exist')
  })

  it('show next date', () => {
    cy.intercept('https://localhost:44303/api/CalendarEvents/*').as('getCalendarEvents')
    let date = new Date()
    let longMonth = date.toLocaleString('pl-PL', { month: 'long' });
    cy.get('[data-qa="date"]').contains(longMonth).should('exist')

    cy.get('[data-qa="nextView"]').click()
    cy.wait(['@getCalendarEvents'])
    date.setMonth((date.getMonth() + 1))
    longMonth = date.toLocaleString('pl-PL', { month: 'long' });
    cy.get('[data-qa="date"]').contains(longMonth).should('exist')
  })

  it('switch to day view', () => {
    // switching from month view doesnt send event get since we have all events for the month
    cy.get('[data-qa="showDayView"]').click()
    const formatOption = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let formatedDate = new Date().toLocaleString('pl-PL', formatOption);

    // Assert
    cy.get('[data-qa="dayView"]').should('be.visible')
    cy.get('[data-qa="date"]').contains(formatedDate).should('exist')
  });

  it('switch to week view', () => {
    // switching from month view doesnt send event get since we have all events for the month

    // Arrange
    const daysInWeek = 7;
    const startDateformatOption = { day: 'numeric', month: 'short', }
    const endDateformatOption = { day: 'numeric', month: 'short', year: 'numeric' }
    let endDay = new Date()
    endDay.setDate(endDay.getDate() + daysInWeek - 1) // -1 since we count first day as days in week
    let formatedStartDate = new Date().toLocaleString('pl-PL', startDateformatOption);
    let formatedEndDate = endDay.toLocaleString('pl-PL', endDateformatOption);
    const dayString = `${formatedStartDate} - ${formatedEndDate}`

    // Act
    cy.get('[data-qa="showWeekView"]').click()

    // Assert
    cy.get('[data-qa="weekView"]').should('be.visible')
    cy.get('[data-qa="date"]').contains(dayString).should('exist')
  });

  it('create event on drag', () => {
    cy.intercept('https://localhost:44303/api/CalendarEvents').as('postCalendarEvents')
    cy.intercept('https://localhost:44303/api/Task').as('postCalendarEvents')
    cy.get('[data-qa="showDayView"]').click()
    cy.get('[data-qa="dayView"]').should('be.visible')


    cy.get('.cal-hour', {force: true}).first().click()
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="modalTitle"]').type('cypress calendar event')
    cy.get('[data-qa="modalDescription"]').type('cypress calendar event desciption')

    //mat-checkbox is a child element need to select via child
    cy.get('#mat-checkbox-1-input').click({force:true});



    cy.get('[data-qa="modalSubmit"]').click()

    cy.wait(['@postCalendarEvents', '@postCalendarEvents'])
    cy.get( '.mat-dialog-container', { timeout: 10000 }).should("not.exist");

  })
})
