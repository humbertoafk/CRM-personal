import { CalendarEvent } from "../entities/event";

export interface CalendarRepository {
  getEvents(): Promise<CalendarEvent[]>;
  getEventById(id: string): Promise<CalendarEvent | null>;
  createEvent(event: CalendarEvent): Promise<string>;
  updateEvent(event: CalendarEvent): Promise<void>;
  deleteEvent(id: string): Promise<void>;
}