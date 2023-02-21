import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
export class DevelopmentRoomsService {

  constructor(
    private http: HttpClient,
  ) { }
  getAllDevRooms(pageIndex: number,pageSize: number, fEnabled:boolean): Observable<any>{
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/ViewGrid?page="+ pageIndex + "&pageSize=" + pageSize, httpOptions)
    // return this.http.get(environment.API_SERVICES + "Campus/ViewGrid?page="+ pageIndex + "&pageSize=" + pageSize +"&fEnabled=" + fEnabled, httpOptions)
  }
  createDevRooms(DevRoom: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "DevelopmentRoom/Create", DevRoom, httpOptions);
  }
  updateDevRooms(DevRoom: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "DevelopmentRoom/Update", DevRoom, httpOptions);
  }
  getByIdDevRooms(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetById?id=" + Id, httpOptions);
  }
  deleteByIdDevRooms(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/Delete?id=" + Id, httpOptions);
  }
  getAllBytrainingDevRooms(trainingCenter: string): Observable<any>{
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetEnableDevRoomsByCampus?campusId=" + trainingCenter, httpOptions) }
}
