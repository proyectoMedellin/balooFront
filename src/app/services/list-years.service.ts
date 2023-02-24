import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListYearsService {
  private currentYear: number = new Date().getFullYear();
  private years: number[] = [];

  constructor() { 
    for(let i = 2021; i <= this.currentYear; i++) {
      this.years.push(i);
    }
  }
  getYears(isFutureDate?: boolean) {
    if(isFutureDate == true){
      this.years = []
      for(let i = this.currentYear; i <= this.currentYear+6; i++) {
        this.years.push(i);
      }
    } else{
      this.years = []
      for(let i = 2021; i <= this.currentYear; i++) {
        this.years.push(i);
      }
    }
    return this.years;
  }
}
