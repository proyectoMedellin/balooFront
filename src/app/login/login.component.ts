import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { SecurityRolService } from '../services/security-rol.service';
import { LocalService } from '../services/local.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import {MD5, AES, enc} from 'crypto-js';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userservice: UsersService,
    private securityServices: SecurityRolService,
    private alertMessage: MatSnackBar,
    private localservice: LocalService,
    private dialog: MatDialog
    ) { }
  public hide= true;
  public LoginForm  = new FormGroup({
    User: new FormControl('', [Validators.required]),
    UserPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  login(){
    let password = MD5(this.LoginForm.getRawValue()['UserPassword']).toString()

    let userlogin = this.LoginForm.getRawValue()['User']+'||' +  password + '||' + moment().locale('es').format()
    let dataUserLogin = {UserData:userlogin}
    
     this.userservice.login(dataUserLogin).subscribe(data => 
      {
      if(data["registros"][0] != null ){
        this.userservice.setToken(data["registros"][0]["token"])
        this.security();
      }else{
        this.alertMessage.open("Datos incorrectos", "Aceptar", 
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
      },
      err => {
        this.alertMessage.open("Datos incorrectos", "Aceptar", 
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      });
  }
  security(){
    let dialogRefL: any
    dialogRefL = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'loading',title: 'Iniciando sesión', message: 'Espere un momento'},
      disableClose: true
    });
    this.securityServices.getAllPermission(this.LoginForm.getRawValue()['User']).subscribe(data => {
      data["registros"][0].forEach((value: any) => 
      { 
        let permiso = MD5("permiso"+value["name"]).toString()
        this.localservice.saveData(permiso, value["name"]+value["type"]);
     }
     );
     let userEncrypt = AES.encrypt(this.LoginForm.getRawValue()['User'], environment.Key).toString()
     this.localservice.saveData("user", userEncrypt)
     dialogRefL.close()
     location.href = environment.url + "Inicio"
    },
    err => {
      dialogRefL.close()
      this.alertMessage.open("Error al consultar permisos", "Aceptar", 
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
      location.href = environment.url + "Inicio"
    })
  }

  /*login(){
    //let prueba = AES(this.LoginForm.getRawValue()['UserPassword'])
    let password = MD5(this.LoginForm.getRawValue()['UserPassword']).toString()
    let userlogin = this.LoginForm.getRawValue()['User']+'||' +  password + '||' + moment().locale('es').format()
    let iv = enc.Utf8.parse(environment.Salt);
    let encript= AES.encrypt(userlogin, environment.Key, 
      {
        keySize: 128 / 8,
        iv: iv
      }
    ).toString()
    let dataUserLogin = {UserData:encript}
    
     this.userservice.login(dataUserLogin).subscribe(data => 
      {
       this.userservice.setToken(data["registros"][0]["token"])
       this.security();
      },
      err => {
          this.alertMessage.open("Datos incorrectos", "Aceptar", 
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      );
    
  }
  security(){
    this.securityServices.getAllPermission(this.LoginForm.getRawValue()['User']).subscribe(data => {
      data["registros"][0].forEach((value: any) => 
      { 
        let permiso = MD5("permiso"+value["name"]).toString()
        this.localservice.saveData(permiso, value["name"]+value["type"]);
     }
     );
     let userEncrypt = AES.encrypt(this.LoginForm.getRawValue()['User'], environment.Key).toString()
     this.localservice.saveData("user", userEncrypt)
     //location.href = environment.url + "Inicio"
    })
  }*/
}
