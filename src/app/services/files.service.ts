import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

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

export class FilesService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  /*getByYear(year: number): Observable<any>{
    return this.http.get(environment.API_SERVICES + "WorkingDays/GetByYear?year=" + year, httpOptions);
  }

  Configure(DtoWorkingDaysReq: any): Observable<any>{
    return this.http.post(environment.API_SERVICES + "WorkingDays/Configure", DtoWorkingDaysReq, httpOptions);
  }*/
}
