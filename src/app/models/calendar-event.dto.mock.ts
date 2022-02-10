import { CalendarEventDto } from "./calendar-event.dto";

export class CalendarEventDtoMock {
  static dto(): CalendarEventDto[] {
    return [
      {
        start: new Date(),
        startDate : '',
        endDate : '',
        id: 1,
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
