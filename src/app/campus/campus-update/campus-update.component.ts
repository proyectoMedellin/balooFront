import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { TrainingCenterListDto } from 'src/app/interfaces/training-center-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campus-update',
  templateUrl: './campus-update.component.html',
  styleUrls: ['./campus-update.component.css']
})
export class CampusUpdateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private campusService: CampusService,
    private route: ActivatedRoute ,
    public trainingCenterService: TrainingCenterService,
    private dialog: MatDialog,
  ) { }
  private recordId = '';
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public listaCentros: TrainingCenterListDto[] = [];
  CampusForm = this.formBuilder.group({
    Id: ['', Validators.required],
    TrainingCenterId:['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true],
    ModifiedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.Trainingcenter()
    this.route.params.subscribe(params => {
      this.recordId =params['record']
      this.CampusForm.patchValue({
        Id: this.recordId
    })
    });
    this.campusService.getByIdCampus(this.recordId).subscribe(data=>
      {
        let regiter = data["registros"][0]
        this.CampusForm.patchValue({
          TrainingCenterId: regiter["trainingCenterId"],
          Code: regiter["code"],
          Name: regiter["name"],
          Enabled: regiter["enabled"],
        })
      }
    )
  }
  Trainingcenter(){
    this.trainingCenterService.GetAllEnabledTraningCenter().subscribe(data => this.listaCentros = data["registros"])
  }
  UpdateCampus(){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.campusService.updateCampus(this.CampusForm.value)
      .subscribe(response => location.href = environment.url + "Campus")
    }, 100)
    dialogRefL.close()
  }
}
