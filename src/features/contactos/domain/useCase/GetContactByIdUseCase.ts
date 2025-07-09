import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class GetContactByIdUseCase {
    constructor (private repository: ContactRepository){}

    async execute(id: string): Promise<Contact | null> {
        try {
            return await this.repository.getContactById(id);
        } catch (error) {
            console.error('Error al encontrar el contacto:', error);
            throw new Error('No se pudo obtener ese contacto');
        }
    }
}