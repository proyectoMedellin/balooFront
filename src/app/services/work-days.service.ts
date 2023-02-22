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
export class WorkDaysService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  getAll(): Observable<any>{
    return this.http.get(environment.API_SERVICES + "WorkingDays/GetAll", httpOptions);
  }

  Configure(DtoWorkingDaysReq: any): Observable<any>{
    return this.http.post(environment.API_SERVICES + "WorkingDays/Configure", DtoWorkingDaysReq, httpOptions);
  }
  
  Delete(year: number): Observable<any>{
    return this.http.get(environment.API_SERVICES + "WorkingDays/Delete?year=" + year, httpOptions);
  }
}
