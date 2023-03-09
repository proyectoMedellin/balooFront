import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UsersService } from '../../services/users.service';
import { AES, enc } from 'crypto-js';
import { CorreoService } from '../../services/correo.service';
import { SecurityRolService } from '../../services/security-rol.service';
import { CampusService } from '../../services/campus.service';
import { TrainingCenterService } from '../../services/training-center.service';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { LocalService } from 'src/app/services/local.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public userEncrypt = this.localstorageservice.getData('user')!
  public user = AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8)
  public AddUsers = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    OtherNames: new FormControl(''),
    LastName: new FormControl('',[Validators.required]),
    OtherLastName: new FormControl(''),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UserName: new FormControl('', [Validators.required]),
    Phone: new FormControl(''),
    DocumentTypeId: new FormControl('', [Validators.required]),
    DocumentNo: new FormControl('', ),
    CreatedBy: new FormControl(this.user, [Validators.required]),
    RolsId: new FormControl('', [Validators.required]),
    TrainingCenterId: new FormControl('00000000-0000-0000-0000-000000000000'),
    CampusId: new FormControl([]),
    GlobalUser: new FormControl(false)
  });
  public RecoveryForm  = new FormGroup({
    Body: new FormControl(''),
    UserName: new FormControl('', [Validators.required]),
    Subject: new FormControl('Asignacion')
  });
  public documents: any = [];
  public campus: any = [];
  public rols: any = [];
  public trainingcenter: any = [];
  public admin: boolean = false;
  constructor(
    private formBulider: FormBuilder,
    public userservice: UsersService,
    private correoservice: CorreoService,
    public rolservice: SecurityRolService,
    public campusservice: CampusService,
    public trainingCenterService: TrainingCenterService,
    private alertMessage: MatSnackBar,
    public localstorageservice: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Documents()
    this.Rols()
    this.Trainingcenter()
    this.Admin()
  }
  Admin(){
    this.rolservice.getIsAdmin(this.user).subscribe(data => this.admin = data["registros"][0])
  }
  Documents(){
    this.userservice.getAllDocuments().subscribe(data => this.documents = data["registros"][0])
  }
  Rols(){
    this.rolservice.getAllRoles().subscribe(data => this.rols = data["registros"][0])
  }
  Trainingcenter(){
    this.trainingCenterService.GetAllEnabledTraningCenter().subscribe(data => this.trainingcenter = data["registros"])
  }
  Campus(trainingCenter: any){
    this.campusservice.getAllBytrainingCenterCampus(trainingCenter).subscribe(data => this.campus= data["registros"])
  }

  ChangeInputUser(){
    this.AddUsers.patchValue({
      UserName: this.AddUsers.get('Email')?.value
    })
  }
  SignUp(data: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
   this.userservice.register(data).subscribe(response => this.sendNotificacion())
    }, 100)
    dialogRefL.close()
  }
  validateDocument(formdata: any){
  this.userservice.existdocument(this.AddUsers.getRawValue()['DocumentTypeId'], this.AddUsers.getRawValue()['DocumentNo']).subscribe(
    (data)=> {
      if (data["registros"][0]==false){
        this.validateUserName(formdata)
      }else{
          this.alertMessage.open("Ya existe este documento por favor valide", "Aceptar",
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
      }
    }
  )
  }
  validateUserName(formdata: any){
    this.userservice.existUserName(this.AddUsers.getRawValue()['UserName']).subscribe((data)=> {
      if (data["registros"][0]==false){
        this.SignUp(formdata)
      }else{
          this.alertMessage.open("Ya existe este nombre de usuario por favor valide", "Aceptar",
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
      }
    })
  }
  sendNotificacion(){
    let text = `${this.AddUsers.get("UserName")?.value}||${moment().locale('es').format()}`
    let textEncrypt = AES.encrypt(text, environment.Key).toString()
    let urlpassword = environment.url + "ChangePassword?DateRecover=" + textEncrypt
    let message ='<!DOCTYPE html><html><body><p>Debe establecer una contraseña para SIECA.</p> <p>Por favor de clic en la siguiente liga: <a href="'+urlpassword +'">proporcione una contraseña</a></p></body></html>'
    let dataUser = {Body:message, UserName:this.AddUsers.get("UserName")?.value, Subject:"Asignar clave"}

    this.correoservice.sendEmailRecover(this.AddUsers.getRawValue()['Email'], dataUser).subscribe(
        response => {location.href = environment.url + "UsersList"}
      )
  }
  change(){
    this.AddUsers.patchValue({
      TrainingCenterId: '00000000-0000-0000-0000-000000000000',
    })
  }
}
