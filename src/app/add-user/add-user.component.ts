import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UsersService } from '../services/users.service';
import { AES } from 'crypto-js';
import { CorreoService } from '../services/correo.service';
import { SecurityRolService } from '../services/security-rol.service';
import { CampusService } from '../services/campus.service';
import { TrainingCenterService } from '../services/training-center.service';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

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
    CreatedBy: new FormControl('SuperAdminTest', [Validators.required]),
    RolsId: new FormControl('', [Validators.required]),
    TrainingCenterId: new FormControl('', [Validators.required]),
    CampusId: new FormControl('', [Validators.required])
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
  constructor(
    private formBulider: FormBuilder,
    public userservice: UsersService,
    private correoservice: CorreoService,
    public rolservice: SecurityRolService,
    public campusservice: CampusService,
    public trainingCenterService: TrainingCenterService,
    private alertMessage: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.Documents()
    this.Rols()
    this.Trainingcenter()
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
   this.userservice.register(data).subscribe(response => this.sendNotificacion())
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
    let dataUser = {Body:urlpassword, UserName:this.AddUsers.get("UserName")?.value, Subject:"Asignar clave"}

    this.correoservice.sendEmailRecover(this.AddUsers.getRawValue()['Email'], dataUser).subscribe(
        response => {location.href = environment.url
        console.log(response)}

      )
  }
}
