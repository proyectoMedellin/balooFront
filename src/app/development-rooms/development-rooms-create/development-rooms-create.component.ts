import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AES, enc } from 'crypto-js';
import { CampusListDto } from 'src/app/interfaces/campus-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { environment } from 'src/environments/environment';
import { DevelopmentRoomsService } from 'src/app/services/development-rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-development-rooms-create',
  templateUrl: './development-rooms-create.component.html',
  styleUrls: ['./development-rooms-create.component.css']
})
export class DevelopmentRoomsCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private campusService: CampusService,
    private developmentRoomsService: DevelopmentRoomsService,
    private dialog: MatDialog,
    ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);
  sedes: CampusListDto[] = [];
  DevelopmentRoomForm = this.formBuilder.group({
    CampusId:['',Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    DahuaChannelCode:['', Validators.required],
    Enabled:[true, Validators.required],
    CreatedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.Campus()
  }
  Campus(){
    this.campusService.getAllCampusEnabled(0,1000,true).subscribe(data => this.sedes = data["registros"])
  }
  CreateDevRooms(data: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.developmentRoomsService.createDevRooms(data).subscribe(response => location.href = environment.url + "DevelopmentRooms")
    }, 100)
    dialogRefL.close()
  }

}

