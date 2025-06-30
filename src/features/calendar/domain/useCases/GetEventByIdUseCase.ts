import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";

export class GetEventByIdUseCase {
    constructor(private repository: CalendarRepository){}

    async execute(id: string): Promise<CalendarEvent | null>{
        return this.repository.getEventById(id);
    }
}