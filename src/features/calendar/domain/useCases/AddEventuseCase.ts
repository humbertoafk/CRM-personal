import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";


export class AddEventUseCase {
    constructor(private repository: CalendarRepository){}

    async execute(event: CalendarEvent): Promise<string>{
        return this.repository.createEvent(event);
    }
}