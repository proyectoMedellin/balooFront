import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders( { 
   'Accept': '*/*',
   'Ocp-Apim-Subscription-Key': environment.subscriptioKey,}),
   reportProgress: true,
}

@Injectable({
  providedIn: 'root'
})

export class FilesService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  UploadBeneficiaryPhoto(FormData: any): Observable<any>{
    return this.http.post(environment.API_SERVICES + "Files/UploadPhoto", 
    FormData, httpOptions);
  }
}
