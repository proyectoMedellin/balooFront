import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//configuracion de cabezeras 
const httpOptions = {
  headers: new HttpHeaders( { 
   'Content-Type': 'application/json;odata=nometadata', 
   'Accept': 'application/json;odata=nometadata',
   'Ocp-Apim-Subscription-Key': environment.url
 })
} 
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(
    private http: HttpClient
    ) { }

  sendEmail(receptor: string, content: any){
     return this.http.post(environment.API_Notification, content, { responseType: 'text' }).pipe(
      map(
        (response: any) => {
          if (response){
            console.log(response)
            return response
          }
        }
        
      )
     )

  }
}
