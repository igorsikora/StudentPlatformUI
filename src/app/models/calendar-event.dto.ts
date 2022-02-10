import { CalendarEvent } from "angular-calendar";

export interface CalendarEventDto extends CalendarEvent {
  id: number,
  description: string;
  startDate: string;
  endDate: string;
}
