import { ContactRepository } from "../repository/ContactRepository";
import { Contact } from "../entities/contact";

export class DeleteContactUseCase {
    constructor (private repository: ContactRepository){}

    async execute(id: string): Promise<void>{
        try {return this.repository.deleteContact(id);
        }catch(error){
            console.error('Error al eliminar el contacto', error);
            throw new Error('No se pudo eliminar el contacto, intenta de nuevo');
        }
    }
}