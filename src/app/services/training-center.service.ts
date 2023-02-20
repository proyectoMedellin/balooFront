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
export class TrainingCenterService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }
  getAllTrainingCenter(pageIndex: number,pageSize: number, fEnabled:boolean): Observable<any>{
    return this.http.get(environment.API_SERVICES + "TrainingCenter/ViewGrid?page="+ pageIndex + "&pageSize=" + pageSize +"&fEnabled=" + fEnabled, httpOptions)
  }
  createTraningCenter(traningCenter: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "TrainingCenter/Create", traningCenter, httpOptions);
  }
  updateTraningCenter(traningCenter: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "TrainingCenter/Update", traningCenter, httpOptions);
  }
  GetByIdTraningCenter(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "TrainingCenter/GetById?id=" + Id, httpOptions);
  }
  DeleteByIdTraningCenter(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "TrainingCenter/Delete?id=" + Id, httpOptions);
  }
}

