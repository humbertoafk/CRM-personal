import { CalendarEvent } from '../entities/event';
import { CalendarRepository } from '../repository/CalendarRepository';


export class GetAllEventsUseCase {
    constructor ( private repository: CalendarRepository){}

    async execute(): Promise<CalendarEvent[]>{
        return this.repository.getEvents();
    }
}