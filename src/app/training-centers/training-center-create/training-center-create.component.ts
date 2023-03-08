import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-training-center-create',
  templateUrl: './training-center-create.component.html',
  styleUrls: ['./training-center-create.component.css']
})
export class TrainingCenterCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public trainingCenterService: TrainingCenterService,
    private dialog: MatDialog,
  ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public TrainingCenterForm = this.formBuilder.group({
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true, Validators.required],
    CreatedBy:[this.user, Validators.required]
  });
  public TrainingCenterStatus: boolean = true;

  ngOnInit(): void {
  }
  CreateTrainingCenter(data: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.trainingCenterService.createTraningCenter(data).subscribe(response => location.href = environment.url + "TrainingCenters")
    }, 100)
    dialogRefL.close()
  }
}
