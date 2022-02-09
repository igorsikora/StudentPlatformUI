import { StudentCalendarEventDto } from "./student-calendar-event.dto";

export class StudentCalendarEventDtoMock {
  static dto(): StudentCalendarEventDto[] {
    return [
      {
        start: new Date(),
        startDate : '',
        endDate : '',
        id: 1,
        studentId: 1,
        title: 'Praca inżynierska',
        description: 'praca',
        draggable: true,
        resizable: {
          afterEnd: true,
          beforeStart: true
        },
      }
    ]

  }
}
