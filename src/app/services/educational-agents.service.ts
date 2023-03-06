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
export class EducationalAgentsService {

  constructor(
    private http: HttpClient,
  ) { }
  getAllEduAgent(pageIndex: number,pageSize: number): Observable<any>{
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetGroupsByYear?page="+ pageIndex + "&pageSize=" + pageSize, httpOptions)
  }
  getAllByYearEduAgent(pageIndex: number,pageSize: number, year:number): Observable<any>{
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetGroupsByYear?year="+year+"&page="+ pageIndex + "&pageSize=" + pageSize, httpOptions)
  }
  createAssignEduAgents(eduAgen: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "DevelopmentRoom/AssignAgentesByYearToDevRoom", eduAgen, httpOptions);
  }
  updateAssignEduAgent(eduAgen: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "DevelopmentRoom/AssignAgentesByYearToDevRoom", eduAgen, httpOptions);
  }
  getByDevRoomIdYearEduAgent(Id: string, year: number): Observable<any> {
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetGroupsByYear?DevRoomId=" + Id + "&year=" + year, httpOptions);
  }
  deleteByIdEduAgent(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/DeleteGroupAssignment?groupAssignmentId=" + Id, httpOptions);
  }
  GetGroupsYearAssignmentById(Id: string): Observable<any> {
    return this.http.get(environment.API_SERVICES + "DevelopmentRoom/GetGroupsYearAssignmentById?id=" + Id, httpOptions);
  }
}
