import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class GetContactsUseCase {
    constructor (private repository: ContactRepository){}
    async execute(): Promise<Contact[]> {
        try {
            return await this.repository.getContacts();
        } catch (error) {
            console.error('Error al obtener contactos:', error);
            throw new Error('No se pudieron obtener los contactos');
        }
    }
}