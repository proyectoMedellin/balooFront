import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AES, enc} from 'crypto-js';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';
import { MD5 } from 'crypto-js';
import * as moment from 'moment';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit, AfterContentInit {

  constructor(
    public route: Router,
    private alertMessage: MatSnackBar,
    private userservices: UsersService
  ) { }
  static matches(form: FormGroup){
    const password = form.get('PasswordUser')?.value
    const passwordtwo = form.get('ConfirmPass')?.value
    return password == passwordtwo ? null : {equals: true};
}
  public urlTree = this.route.parseUrl(this.route.url);
  public DateRecover = this.urlTree.queryParams['DateRecover'];
  public hide = true
  public hidetwo = true
  public user = "";
  //formulario
  public PasswordForm  = new FormGroup({
    PasswordUser: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])([A-Za-z\d$@$!%*?&]|[^ ]){8,50}$/)]),
    ConfirmPass: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    let nowMoment = moment().locale('es')
    let textEncrypt = this.DateRecover.replace(/ /g, "+")
    let textDecrypt = AES.decrypt(textEncrypt, environment.Key).toString(enc.Utf8)
    let data = textDecrypt.split("||")
    this.user = data[0];
    let urlMoment = moment(data[1]).locale('es')
    if(nowMoment.diff(urlMoment, 'hour') > 1 || data[0].length == 0  || data[1].length == 0){
       if(nowMoment.diff(urlMoment, 'hour') > 1){
        this.alertMessage.open("La url expiro solicite otra url", "Aceptar")
       }
       location.href = environment.url + 'Login'
     }
  }
  ngAfterContentInit(): void {
    if(this.DateRecover == null)
    {
      location.href = environment.url + 'Login'
    }
  }
  prueba(){
    if(this.PasswordForm.get('PasswordUser')?.value == this.PasswordForm.get('ConfirmPass')?.value){
    }
  }
  changePassword(){
    let passwordchange = MD5(this.PasswordForm.get('PasswordUser')?.value).toString()
    let UserData = {user: this.user, password: passwordchange}
    if(this.PasswordForm.get('PasswordUser')?.value == this.PasswordForm.get('ConfirmPass')?.value){
      this.userservices.updatePassword(this.user, passwordchange).subscribe(Response => {
        location.href = environment.url
      })
     }else{
       this.alertMessage.open("Las contraseñas no coinciden", "Aceptar")
     }
  }
}
