import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { HolidayDto } from 'src/app/interfaces/holiday-dto';
import { WorkingDayDto } from 'src/app/interfaces/working-day-dto';
import { WorkDaysService } from 'src/app/services/work-days.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-holidays-update',
  templateUrl: './holidays-update.component.html',
  styleUrls: ['./holidays-update.component.css']
})

export class HolidaysUpdateComponent implements OnInit {
  
  private yearUpd: number = 0;
  private yearCurrentInfo: WorkingDayDto | undefined;
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);
  
  public HolidaysForm:FormGroup = this.formBuilder.group({
    Year:[new Date().getFullYear(), Validators.required],
    Monday:[true, Validators.required],
    Tuesday:[true, Validators.required],
    Wednesday:[true, Validators.required],
    Thursday:[true, Validators.required],
    Friday:[true, Validators.required],
    Saturday:[false, Validators.required],
    Sunday:[false, Validators.required],
    CreatedBy:[this.user, Validators.required],
    Holidays: this.formBuilder.array([])
  });

  constructor(
    private route: ActivatedRoute, 
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public WorkDaysService: WorkDaysService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.yearUpd =params['record'];
    });
    this.UploadPreviousData();
  }

  UploadPreviousData(){
    this.WorkDaysService.getByYear(this.yearUpd).subscribe(
      (yearData: any) => {
          let registros: WorkingDayDto[] = yearData.registros;
          if(registros.length > 0){
            this.yearCurrentInfo = registros[0];
            this.HolidaysForm.patchValue({
              Year: this.yearCurrentInfo.year,
              Monday:this.yearCurrentInfo.monday,
              Tuesday:this.yearCurrentInfo.tuesday,
              Wednesday:this.yearCurrentInfo.wednesday,
              Thursday:this.yearCurrentInfo.thursday,
              Friday:this.yearCurrentInfo.friday,
              Saturday:this.yearCurrentInfo.saturday,
              Sunday:this.yearCurrentInfo.sunday
            });
            this.yearCurrentInfo.holidays.forEach((element:HolidayDto) => {
              this.AddHolidayData(element.day)
            });

          }
      }
    );
  }

  holidaysListForm(){
    return this.formBuilder.group({
      day: [null]
    });
  }

  holidaysListFormData(dayInput: Date){    
    return this.formBuilder.group({
      day: [this.datepipe.transform(dayInput, 'yyyy-MM-dd')]
    });
  }

  Create(data: any){
    this.WorkDaysService.Configure(data).subscribe(
      response => location.href = environment.url + "Holidays"
    );
  }

  get Holidays(){
    return this.HolidaysForm.get("Holidays") as FormArray;
  }

  AddHoliday(){
    this.Holidays.push(this.holidaysListForm());
  }

  AddHolidayData(dateInput: Date){
    this.Holidays.push(this.holidaysListFormData(dateInput));
  }

  removeTempHoliday(index:number){
    this.Holidays.removeAt(index);
  }
}










