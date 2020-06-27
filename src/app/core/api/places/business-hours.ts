import { WeekDayHours } from './week-day-hours';

export interface BusinessHours {
    type: number;
    monday?: WeekDayHours;
    tuesday?: WeekDayHours;
    wednesday?: WeekDayHours;
    thursday?: WeekDayHours;
    friday?: WeekDayHours;
    saturday?: WeekDayHours;
    sunday?: WeekDayHours;
}

