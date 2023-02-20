import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AES, enc, MD5 } from 'crypto-js';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalService } from '../services/local.service';
import { SecurityRolService } from '../services/security-rol.service';
import { UsersService } from '../services/users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthPermissionGuard implements CanActivate {
  subs= new Subscription();
  public permission: any = []; 
  constructor(
   private localservice: LocalService,
   private userservices: UsersService,
   private securityServices: SecurityRolService,
   private router: Router
  ){
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  { 
    let autorizathion: boolean = false;
    let userEncrypt:string = localStorage.getItem("user")!
    let user =AES.decrypt(userEncrypt, environment.Key).toString(enc.Utf8);
    this.subs.add(
      this.securityServices.getAllPermission(user).subscribe(data => this.permission = data["registros"][0])
    ) 
    let  permisosRequeridos= route.data["permiso"][0]
    let permiso = permisosRequeridos.split(", ")
    permiso.forEach((value: string) =>
     {
      let cadena = MD5("permiso"+ value).toString()
      if(this.localservice.getData(cadena) != null)
        {
          autorizathion = true
        }
      } )
    if (autorizathion && this.checkIfUserIsAuthenticated())
      {  
          return true
      }
      else{
          this.router.navigate(['/Inicio']);
          return false
      } 
  }
  checkIfUserIsAuthenticated() {
    if (this.userservices.getToken() != null && this.userservices.getToken().length > 0 ) {
      return true;
    }else{
      return false;
    }
  }
  
}
