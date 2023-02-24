import { HolidayDto } from "../intefaces/holiday-dto";

export interface WorkingDayDto {
    year:number,
    monday:boolean,
    tuesday:boolean,
    wednesday:boolean,
    thursday:boolean,
    friday:boolean,
    saturday:boolean,
    sunday:boolean,
    confUser: string,
    holidays: HolidayDto[]
}
