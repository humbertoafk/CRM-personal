import { Contact } from "../entities/contact";

export interface ContactRepository {
  getContacts(): Promise<Contact[]>;
  getContactById(id: string): Promise<Contact | null>;
  //crear un contacto
  // createContact(contact: Contact): Promise<void>;
  //actualizar un contacto
  // updateContact(contact: Contact): Promise<void>;
  //eliminar un contacto
  // deleteContact(id: string): Promise<void>;
}