import { WeedDayHours } from './weed-day-hours';

export interface BusinessHours {
    type: number;
    monday?: WeedDayHours;
    tuesday?: WeedDayHours;
    wednesday?: WeedDayHours;
    thursday?: WeedDayHours;
    friday?: WeedDayHours;
    saturday?: WeedDayHours;
    sunday?: WeedDayHours;
}

