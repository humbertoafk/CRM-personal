import * as Contacts from 'expo-contacts';
import { ContactModel } from '../models/contactModel';

export class ContactService {
  async getContacts(): Promise<ContactModel[]> {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permiso denegado para acceder a contactos.');
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.Image],
    });

    return data
      .filter(contact => contact.name)
      .map(contact => ({
        id: contact.id ?? '',
        name: contact.name ?? 'Sin nombre',
        firstName: contact.firstName ?? '',
        lastName: contact.lastName ?? '',
        contactType: contact.contactType ?? '',
        imageAvailable: contact.imageAvailable ?? false,
        imageUri: contact.image?.uri ?? undefined,
        isFavorite: contact.isFavorite ?? false,
        lookupKey: (contact as any).lookupKey ?? '',
      }));
  }

  async getContactById(id: string): Promise<ContactModel | null> {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.Image],
    });

    const contact = data.find(c => c.id === id);
    if (!contact) return null;

    return {
      id: contact.id ?? '',
      name: contact.name ?? 'Sin nombre',
      firstName: contact.firstName ?? '',
      lastName: contact.lastName ?? '',
      contactType: contact.contactType ?? '',
      imageAvailable: contact.imageAvailable ?? false,
      imageUri: contact.image?.uri ?? undefined,
      isFavorite: contact.isFavorite ?? false,
      lookupKey: (contact as any).lookupKey ?? '',
    };
  }

  async createContact(contact: ContactModel): Promise<string> {
    const permission = await Contacts.requestPermissionsAsync();
    if (permission.status !== 'granted') {
      throw new Error('Permiso denegado para crear contacto.');
    }

    const contactId = await Contacts.addContactAsync({
      [Contacts.Fields.FirstName]: contact.firstName,
      [Contacts.Fields.LastName]: contact.lastName,
      [Contacts.Fields.Name]: contact.name,
    });

    return contactId;
  }

  async updateContact(contact: ContactModel): Promise<void> {
    if (!contact.id) throw new Error('El contacto no tiene ID.');

    await Contacts.updateContactAsync({
      id: contact.id,
      [Contacts.Fields.FirstName]: contact.firstName,
      [Contacts.Fields.LastName]: contact.lastName,
      [Contacts.Fields.Name]: contact.name,
    });
  }

  async deleteContact(id: string): Promise<void> {
    await Contacts.removeContactAsync(id);
  }
}
