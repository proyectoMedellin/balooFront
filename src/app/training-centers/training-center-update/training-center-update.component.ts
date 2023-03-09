import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute  } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-center-update',
  templateUrl: './training-center-update.component.html',
  styleUrls: ['./training-center-update.component.css']
})
export class TrainingCenterUpdateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute ,
    private formBuilder: FormBuilder,
    private trainingCenterService: TrainingCenterService,
    private dialog: MatDialog,
  ) { }

  private recordId = '';
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public TrainingCenterForm = this.formBuilder.group({
    Id: ['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true, Validators.required],
    ModifiedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recordId = params['record']
      this.TrainingCenterForm.patchValue({
        Id: this.recordId
    })
    });
    this.trainingCenterService.GetByIdTraningCenter(this.recordId).subscribe(data=>
      {
        let regiter = data["registros"][0]
        this.TrainingCenterForm.patchValue({
          Code: regiter["code"],
          Name: regiter["name"],
          Enabled: regiter["enabled"],
        })
      }
    )
  }


  UpdateTrainingCenter(){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.trainingCenterService.updateTraningCenter(this.TrainingCenterForm.value).subscribe(response => location.href = environment.url + "TrainingCenters")
    }, 100)
    dialogRefL.close()
  }

}
