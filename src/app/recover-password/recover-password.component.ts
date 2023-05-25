import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CorreoService } from '../services/correo.service';
import { environment } from 'src/environments/environment';
import { AES, enc } from 'crypto-js';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(
   public ns: CorreoService,
   private dialog: MatDialog
  ) { }
  confirmed = false;
  public DateRecover = moment().locale('es').format()
  public RecoveryForm  = new FormGroup({
    Body: new FormControl(''),
    UserName: new FormControl('', [Validators.required]),
    Subject: new FormControl('Recupercion')
  });
  
  ngOnInit(): void {
  }
  sendNotificacion(Formdata: any){
    let dialogRef: any
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'loading',title: 'Enviando', message: 'Espere un momento'},
      disableClose: true
    });
    let text = `${this.RecoveryForm.get("UserName")?.value}||${moment().locale('es').format()}`
    let textEncrypt = AES.encrypt(text, environment.Key).toString()
    let url = environment.url + "ChangePassword?DateRecover=" + textEncrypt
    Formdata['Body'] = '<!DOCTYPE html><html><body><p>Ha solicitado restablecer su contraña en Baloo.</p> <p>Por favor de clic en la siguiente liga: <a href="'+url+'">proporcione una nueva contraseña</a></p></body></html>'
    this.ns.sendEmailRecover(this.RecoveryForm.getRawValue()['Email'], Formdata).subscribe(
        response => {
          dialogRef.close()
          dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {type: 'successful',title: 'Se envio un correo de recuperación', message: 'Por favor revise la bandeja de correo', textButton: 'Aceptar' }
          });
          dialogRef.afterClosed().subscribe((result: boolean) => {
            this.confirmed = result
            if(this.confirmed){   
              dialogRef.close() 
              location.href = environment.url
            }
          })

        },
        err => {
          dialogRef.close()
          dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {type: 'alert-red',title: 'Error al enviar el correo', message: 'Por favor verifique el nombre de usuario', textButton: 'Aceptar' }
          });
          dialogRef.afterClosed().subscribe((result: boolean) => {
            this.confirmed = result
            if(this.confirmed){   
              dialogRef.close() 
            }
        })
       }
      )
  }
}
