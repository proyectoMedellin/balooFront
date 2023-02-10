import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AES, enc, MD5 } from 'crypto-js';
import { SecurityRolService } from './services/security-rol.service';
import { UsersService } from './services/users.service';
import { LocalService } from './services/local.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = 'Sieca';
  public items: any[] = [] ;
  public login: boolean= false;
  constructor(
    private rolservice: SecurityRolService,
    private userservice: UsersService,
    private localservice: LocalService,
    private alertMessage: MatSnackBar,
  ){
  }
  ngOnInit(){
    this.login = false
    if(this.userservice.getToken() != null && this.userservice.getToken().length > 0){
      this.login = true
      let userEncrypt:string = localStorage.getItem("user")!
      let userDecrypt = AES.decrypt(userEncrypt, environment.Key).toString(enc.Utf8)
      this.rolservice.getMenuItems(userDecrypt).subscribe(data => {
        this.items = data["registros"][0]
      },
      err => {
          this.alertMessage.open("Error al consultar el menú", "Aceptar", 
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
      })
    }
    
  }
  logOut(){
    this.userservice.logOut()
    location.reload()
    this.localservice.clearData()
    location.href = environment.url + 'LoginCaptchat'
  }
}
