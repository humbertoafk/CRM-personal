import { Contact } from "../entities/contact";

export interface ContactRepository {
  getContacts(): Promise<Contact[]>;
  getContactById(id: string): Promise<Contact | null>;
  createContact(contact: Contact): Promise<string>;
  updateContact(contact: Contact): Promise<void>;
  deleteContact(id: string): Promise<void>;
}