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
  getYears() {
    return this.years;
  }
}
