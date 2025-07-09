import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class CreateContactsUseCase {
    constructor (private repository: ContactRepository){}
    async execute(contact: Contact ): Promise<void> {
        try {
            return await this.repository.createContact(contact);
        } catch (error) {
            console.error('Error al agregar el contact', error);
            throw new Error('No se pudo crear un contacto nuevo');
        }
    }
}