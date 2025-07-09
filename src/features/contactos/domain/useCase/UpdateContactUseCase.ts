import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class UpdateContactsUseCase {
    constructor (private repository: ContactRepository){}

    async execute(contact : Contact): Promise<void> {
        try {
            return await this.repository.updateContact(contact)
        } catch (error) {
            console.error('Error al obtener contactos:', error);
            throw new Error('No se pudieron obtener los contactos');
        }
    }
}