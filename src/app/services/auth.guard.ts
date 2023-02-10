import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private userservice: UsersService
    ) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.checkIfUserIsAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  checkIfUserIsAuthenticated() {
    console.log("hola")
    var text = MD5("Islogin").toString()
    if (this.userservice.getToken() == text ) {
      return true;
    }else{
      return false;
    }
  }
}