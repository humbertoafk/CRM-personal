import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";


export class DeleteEventUseCase {
    constructor(private repository: CalendarRepository){}

    async execute(id: string):Promise<void>{
        return this.repository.deleteEvent(id);
    }
}