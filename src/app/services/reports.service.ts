import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//configuracion de cabezeras
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;odata=nometadata',
    Accept: 'application/json;odata=nometadata',
    'Ocp-Apim-Subscription-Key': environment.subscriptioKey,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  public dateUpdated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getAllTrainingCenter(
    pageIndex: number,
    pageSize: number,
    fEnabled: boolean
  ): Observable<any> {
    return this.http.get(
      environment.API_SERVICES +
        'TrainingCenter/ViewGrid?page=' +
        pageIndex +
        '&pageSize=' +
        pageSize,
      httpOptions
    );
  }

  GetAllEnabledTraningCenter(): Observable<any> {
    return this.http.get(
      environment.API_SERVICES + 'TrainingCenter/GetEnabledTrainigCenterList',
      httpOptions
    );
  }



  // search filters and get data
  getEnabledBeneficiaries(data: any): Observable<any> {
    return this.http.get(
      `${environment.API_SERVICES}Beneficiaries/GetEnabledBeneficiaries?page=${
        data.page
      }&pageSize=${data.pageSize}&TrainingCenterId=${
        data.trainingCenterId ?? ''
      }&CampusId=${data.campusId ?? ''}&DevelopmentRoomId=${
        data.developmentRoomId ?? ''
      }&documentType=${data.documentType ?? ''}&documentNumber=${
        data.documentNo ?? ''
      }&name=${data.name ?? ''}&group=${data.group ?? ''}
      `
    );
  }

  // get Anthropometric by Id -- API
  getAnthropometricDataById(
    id: string,
    from: string,
    to: string
  ): Observable<any> {
    return this.http.get(
      `${
        environment.API_SERVICES
      }Beneficiaries/GetAnthropometricDataById?id=${id}&from=${from ?? ''}&to=${
        to ?? ''
      }
      `
    );
  }

  // get students by Id
  getStudentDataById(id: string): Observable<any> {
    return this.http.get(
      `${environment.API_SERVICES}Beneficiaries/GetById?id=${id}
      `
    );
  }

  //  Get students emotions Data by Id
  GetEmotionsDataById(id: string,
    from: string,
    to: string) : Observable<any>{
    return this.http.get(
      `${environment.API_SERVICES}Beneficiaries/GetEmotionsDataById?id=${id}&from=${from ?? ''}&to=${
        to ?? ''
      }
      `
    );
  }

  //  Get students emotions Data by Id
  GetAssistenceDataById(id: string,
    from: string,
    to: string) : Observable<any>{
    return this.http.get(
      `${environment.API_SERVICES}Beneficiaries/GetAssistenceDataById?id=${id}&from=${from ?? ''}&to=${
        to ?? ''
      }
      `
    );
  }
}
