export interface CalendarEventModel {
  id: string;
  title: string;
  location: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  contactId: string;
  organizer?: string;
  notificationId?: string;
  attendees?: any[];
}