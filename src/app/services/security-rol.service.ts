import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
export class SecurityRolService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  getMenuItems(user: any): Observable<any> {
   return this.http.get(environment.API_SERVICES + "Menu/GetMenuItems?userName="+ user, httpOptions)
  }
  getAllRoles(): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Rol/GetAllRol", httpOptions)
  }
  getAllPermission(user: string): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Permission/GetAllPermissionByUserName?userName=" + user, httpOptions)
  }
  getIsAdmin(user: string): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Rol/ExistUserByName?userName=" + user, httpOptions)
  }
}
