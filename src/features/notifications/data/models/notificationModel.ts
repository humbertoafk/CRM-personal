export interface NotificationModel {
  id: string;
  title: string;
  body: string;
  triggerDate: Date;
  eventId?: string;
}