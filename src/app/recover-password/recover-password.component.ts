import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CorreoService } from '../services/correo.service';
import { environment } from 'src/environments/environment';
import { AES, enc } from 'crypto-js';
import * as moment from 'moment';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(
   public ns: CorreoService
  ) { }
  public DateRecover = moment().locale('es').format()
  public RecoveryForm  = new FormGroup({
    Body: new FormControl(''),
    UserName: new FormControl('', [Validators.required]),
    Subject: new FormControl('Recupercion')
  });
  
  ngOnInit(): void {
  }
  sendNotificacion(Formdata: any){
    let text = `${this.RecoveryForm.get("UserName")?.value}||${moment().locale('es').format()}`
    let textEncrypt = AES.encrypt(text, environment.Key).toString()
    let url = environment.url + "ChangePassword?DateRecover=" + textEncrypt
    Formdata['Body'] = '<!DOCTYPE html><html><body><p>Ha solicitado restablecer su contraña en SIECA.</p> <p>Por favor de clic en la siguiente liga: <a href="'+url+'">proporcione una nueva contraseña</a></p></body></html>'
    this.ns.sendEmailRecover(this.RecoveryForm.getRawValue()['Email'], Formdata).subscribe(
        response => {
          location.href = environment.url
        }
      )
  }
}
