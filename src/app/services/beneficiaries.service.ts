import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { ViewGridOptions } from '../interfaces/beneficiaries-list-dto';
import { BeneficiaryBaseInfoDto } from '../interfaces/beneficiary-base-info-dto';

//configuracion de cabezeras 
const httpOptions = {
  headers: new HttpHeaders( { 
   'Content-Type': 'application/json;odata=nometadata', 
   'Accept': 'application/json;odata=nometadata',
   'Ocp-Apim-Subscription-Key': environment.subscriptioKey,
  }),
  params: new HttpParams()
}

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  constructor(
    private http: HttpClient,
  ) { }
  getViewGrid(options: ViewGridOptions): Observable<any> {

    if (options.year) {
      httpOptions.params.set('year', options.year.toString());
    }
    if (options.DevelopmentRoomId) {
      httpOptions.params.set('DevelopmentRoomId', options.DevelopmentRoomId);
    }
    if (options.TrainingCenterId) {
      httpOptions.params.set('TrainingCenterId', options.TrainingCenterId);
    }
    if (options.CampusId) {
      httpOptions.params.set('CampusId', options.CampusId);
    }
    if (options.documentNumber) {
      httpOptions.params.set('documentNumber', options.documentNumber.toString());
    }
    if (options.name) {
      httpOptions.params.set('name', options.name);
    }
    if (options.fEnabled !== undefined) {
      httpOptions.params.set('fEnabled', options.fEnabled.toString());
    }
    httpOptions.params.set('page', options.page.toString());
    httpOptions.params.set('pageSize', options.pageSize.toString());

    return this.http.get(`${environment.API_SERVICES}Beneficiaries/ViewGrid`, httpOptions);
  }

  getParamDataByType(type: string): Observable<any> {
    return this.http.get(`${environment.API_SERVICES}Beneficiaries/GetParmaDataByType?type=${type}`,httpOptions);
  }
  create(Beneficiaries: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "Beneficiaries/Create", Beneficiaries, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${environment.API_SERVICES}Beneficiaries/GetById?id=${id}`,httpOptions);
  }

}
