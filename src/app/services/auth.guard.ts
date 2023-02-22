import { Injectable } from '@angular/core';
import {  Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { SecurityRolService } from './security-rol.service';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localservice: LocalService,
    private userservices: UsersService,
    private securityServices: SecurityRolService,
    private router: Router
    ) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    { 
      
      if ( this.checkIfUserIsAuthenticated())
        {  
            return true
        }
        else{
            this.router.navigate(['/Login']);
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