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
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }

  getCountryList(): Observable<any> {
    return this.http.get(environment.API_SERVICES + 'Location/GetCountryList', httpOptions);
  }
  getDepartmentsByCountry(countryId: string): Observable<any> {
    return this.http.get(`${environment.API_SERVICES}Location/GetDeparmentsByCountry?countryId=${countryId}`, httpOptions);
  }
  GetCitiesByDeparment(departmentId: string): Observable<any> {
    return this.http.get(`${environment.API_SERVICES}Location/GetCitiesByDeparment?departmentId=${departmentId}`, httpOptions);
  }

}
