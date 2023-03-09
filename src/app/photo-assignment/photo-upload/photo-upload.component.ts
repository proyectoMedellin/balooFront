import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { BeneficiaryBaseInfoDto } from 'src/app/interfaces/beneficiary-base-info-dto';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { FilesService } from 'src/app/services/files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  private recordId = '';
  public beneficiryData: BeneficiaryBaseInfoDto | undefined;
  public progress: number = 0;
  public message: string = "";
  public localFileRoute: string = "";
  public IsloadedPhoto: boolean = false;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private route: ActivatedRoute ,
    private formBuilder: FormBuilder,
    public BeneficiariesService: BeneficiariesService,
    private FilesService: FilesService,
    private dialog: MatDialog,
  ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recordId =params['record'];
      this.BeneficiariesService.getById(this.recordId).subscribe(b => {
        this.beneficiryData = b['registros'][0];
        if(this.beneficiryData != undefined && this.beneficiryData.photoUrl != ''){
          this.IsloadedPhoto = true;
        }
      });
    })
  }

  UpdateFileRoute(files: any){
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    if(fileToUpload.type.toLowerCase() == 'image/jpeg' ||
      fileToUpload.type.toLowerCase() == 'image/jpg'){
      this.localFileRoute = fileToUpload.name;
    }else{
      alert("por favor seleccione un tipo de foto valida");
      this.localFileRoute = '';
    }
  }

  uploadFile = (files:any) => {
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      if (files.length === 0 || this.localFileRoute === '') {
        return;
      }
      let fileToUpload = <File>files[0];

      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      if(this.beneficiryData != undefined){
        formData.append('beneficiaryId', this.beneficiryData.id);
      }

      this.localFileRoute = fileToUpload.name;

      this.FilesService.UploadBeneficiaryPhoto(formData).subscribe(b => {
          let photoUrl = b['registros'][0];
          if(this.beneficiryData != undefined){
            this.beneficiryData.photoUrl = photoUrl;
            this.IsloadedPhoto = true;
          }
        }
      );}, 100)
    dialogRefL.close()
  }
}
