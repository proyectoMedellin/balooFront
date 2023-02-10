import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UsersService } from '../services/users.service';
import { AES } from 'crypto-js';
import { CorreoService } from '../services/correo.service';
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
    CreatedBy: new FormControl('SuperAdminTest', [Validators.required])
  });
  public documents: any = [];

  constructor(
    private formBulider: FormBuilder,
    public userservice: UsersService,
    private correoservice: CorreoService
  ) { }

  ngOnInit(): void {
    this.Documents()
  }
  
  Documents(){
    this.userservice.getAllDocuments().subscribe(data => this.documents = data["registros"][0])
  }

  ChangeInputUser(){
    this.AddUsers.patchValue({
      UserName: this.AddUsers.get('Email')?.value
    })
  }
  SignUp(data: any){
    console.log(data)
    this.userservice.register(data).subscribe(response => location.href = environment.url)
  }
  sendNotificacion(){
    let text = `${this.AddUsers.get("UserName")?.value}||${moment().locale('es').format()}`
    let textEncrypt = AES.encrypt(text, environment.Key).toString()
    let Formdata: any;
    Formdata['Body'] = environment.url + "ChangePassword?DateRecover=" + textEncrypt
    Formdata['UserName'] = text
    Formdata['Subject'] = "Asignar contraseña"
    this.correoservice.sendEmail(this.AddUsers.getRawValue()['Email'], Formdata).subscribe(
        response => {
          location.href = environment.url
        }
      )
  }
}
