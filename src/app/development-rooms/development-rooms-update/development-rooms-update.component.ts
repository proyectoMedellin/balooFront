import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { CampusListDto } from 'src/app/intefaces/campus-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { DevelopmentRoomsService } from 'src/app/services/development-rooms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-development-rooms-update',
  templateUrl: './development-rooms-update.component.html',
  styleUrls: ['./development-rooms-update.component.css']
})
export class DevelopmentRoomsUpdateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private campusService: CampusService,
    private developmentRoomsService: DevelopmentRoomsService,
    private route: ActivatedRoute ,
  ) { }
  private recordId = '';
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);
  sedes: CampusListDto[] = [];

  DevelopmentRoomForm = this.formBuilder.group({
    Id: ['', Validators.required],
    CampusId:['',Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    DahuaChannelCode:['', Validators.required],
    Enabled:[true, Validators.required],
    ModifiedBy:[this.user, Validators.required]
  });
  ngOnInit(): void {
    this.Campus()
    this.route.params.subscribe(params => {
      this.recordId =params['record']
      this.DevelopmentRoomForm.patchValue({ 
        Id: this.recordId 
    })
    });
    this.developmentRoomsService.getByIdDevRooms(this.recordId).subscribe(data=> 
      {
        let regiter = data["registros"][0]
        this.DevelopmentRoomForm.patchValue({
          CampusId: regiter["campusId"],
          Code: regiter["code"],
          Name: regiter["name"],
          DahuaChannelCode: regiter["dahuaChannelCode"],
          Enabled: regiter["enabled"],
        })
      }
    )
  }
  Campus(){
    this.campusService.getAllCampusEnabled(0,1000,true).subscribe(data => this.sedes = data["registros"])
  }
  UpdateDevRooms(){
    this.developmentRoomsService.updateDevRooms(this.DevelopmentRoomForm.value)
      .subscribe(response => location.href = environment.url + "DevelopmentRooms")
  }
}
