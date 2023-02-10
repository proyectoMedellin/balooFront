import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MD5 } from 'crypto-js';
import * as internal from 'stream';

//configuracion de cabezeras
const httpOptions = {
   headers: new HttpHeaders( {
    'Content-Type': 'application/json;odata=nometadata',
    'Accept': 'application/json;odata=nometadata',
    'Ocp-Apim-Subscription-Key': environment.subscriptioKey,

  })
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  login(user: any): Observable<any> {
    return this.http.post(environment.API_AUTHENTICATION + "Authentication/Login", user, httpOptions);
  }
  register(user: any): Observable<any> {
    return this.http.post(environment.API_AUTHENTICATION + "Users", user, httpOptions);
  }
  updatePassword(user: string, password: string): Observable<any>{
    return this.http.get(environment.API_AUTHENTICATION + "ChangePassword?userName=" + user + '&password=' + password, httpOptions);
  }
  setToken(token: string) {
    const expirationDate = new Date();
    let tokenname = MD5("token").toString()
    expirationDate.setDate(expirationDate.getDate() + 1);
    this.cookies.set(tokenname, token, expirationDate);
  }
  getToken() {
    let tokenname = MD5("token").toString()
    return this.cookies.get(tokenname);
  }
  getUserLogged() {
    const token = this.getToken();
    return this.http.get(environment.API_AUTHENTICATION + token, httpOptions);
  }
  getAllDocuments(): Observable<any>{
    return this.http.get(environment.API_SERVICES + "DocumentType/GetAllDocumentType", httpOptions)
  }
  logOut()
  {
    let tokenname = MD5("token").toString()
    this.cookies.delete(tokenname);
  }
  getUser(user: string): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Users/GetAccessUserByName?userName=" + user, httpOptions)
  }
  getAllUser(pageIndex: number,pageSize: number): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Users/GetAllUsers?pageIndex=" + pageIndex + "&pageSize=" + pageSize, httpOptions)
  }
}
