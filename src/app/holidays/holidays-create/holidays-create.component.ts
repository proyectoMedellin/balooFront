import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { WorkDaysService } from 'src/app/services/work-days.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-holidays-create',
  templateUrl: './holidays-create.component.html',
  styleUrls: ['./holidays-create.component.css']
})

export class HolidaysCreateComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    public WorkDaysService: WorkDaysService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  holidaysListForm(){
    return this.formBuilder.group({
      day: [null]
    });
  }

  Create(data: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.WorkDaysService.Configure(data).subscribe(
        response => location.href = environment.url + "Holidays"
      );
    }, 100)
    dialogRefL.close()
  }

  get Holidays(){
    return this.HolidaysForm.get("Holidays") as FormArray;
  }

  AddHoliday(){
    this.Holidays.push(this.holidaysListForm());
  }

  removeTempHoliday(index:number){
    this.Holidays.removeAt(index);
  }
}





