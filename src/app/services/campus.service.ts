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
export class CampusService {

  constructor(
    private http: HttpClient,
  ) { }
  getAllCampus(pageIndex: number,pageSize: number, fEnabled:boolean): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Campus/ViewGrid?page="+ pageIndex + "&pageSize=" + pageSize +"&fEnabled=" + fEnabled, httpOptions)
  }
  createCampus(Campus: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "Campus/Create", Campus, httpOptions);
  }
  updateCampus(Campus: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "Campus/Update", Campus, httpOptions);
  }
  GetByIdCampus(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "Campus/GetById?id=" + Id, httpOptions);
  }
  DeleteByIdCampus(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "Campus/Delete?id=" + Id, httpOptions);
  }
  getAllBytrainingCenterCampus(trainingCenter: string): Observable<any>{
    return this.http.get(environment.API_SERVICES + "Campus/GetEnableCampusesByTrainingCenter?trainingCenterId=" + trainingCenter, httpOptions)  }
}
