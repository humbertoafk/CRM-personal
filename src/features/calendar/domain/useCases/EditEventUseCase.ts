import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";



export class EditEventUseCase {
    constructor(private repository: CalendarRepository){}

    async execute(event: CalendarEvent): Promise<void>{
        return this.repository.updateEvent(event);
    }
}