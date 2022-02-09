import { CalendarEvent } from "angular-calendar";

export interface StudentCalendarEventDto extends CalendarEvent {
  id: number,
  studentId: number;
  description: string;
  startDate: string;
  endDate: string;
}
