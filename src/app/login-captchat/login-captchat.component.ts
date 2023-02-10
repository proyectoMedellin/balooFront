import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AES, MD5 } from 'crypto-js';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LocalService } from '../services/local.service';
import { SecurityRolService } from '../services/security-rol.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login-captchat',
  templateUrl: './login-captchat.component.html',
  styleUrls: ['./login-captchat.component.css']
})
export class LoginCaptchatComponent implements OnInit {
  
  constructor(
    private userservice: UsersService,
    private securityServices: SecurityRolService,
    private localservice: LocalService
    ) { }
  public hide= true;
  public loginbutton = false;
  public LoginForm  = new FormGroup({
    User: new FormControl('', [Validators.required]),
    UserPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  loginCaptchat(){
    let password = MD5(this.LoginForm.getRawValue()['UserPassword']).toString()

    let userlogin = this.LoginForm.getRawValue()['User']+'||' +  password + '||' + moment().locale('es').format()
    let dataUserLogin = {UserData:userlogin}
    
     this.userservice.login(dataUserLogin).subscribe(data => 
      {
       this.userservice.setToken(data["registros"][0]["token"])
       this.security();
      });
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
     location.href = environment.url + "Inicio"
    })
  }

  resolved(captchaResponse: string) {
    if(captchaResponse != null){
      this.loginbutton = true
    }
  }
}
