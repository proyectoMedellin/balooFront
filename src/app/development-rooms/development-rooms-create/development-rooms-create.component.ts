import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-development-rooms-create',
  templateUrl: './development-rooms-create.component.html',
  styleUrls: ['./development-rooms-create.component.css']
})
export class DevelopmentRoomsCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  DevelopmentRoomForm = this.formBuilder.group({
    CampusId:['',Validators.required],
    Code:['', Validators.required],
    CameraCode:['', Validators.required],
    Enabled:['true', Validators.required]
  });

  sedes: Sedes[] = [
    {value: '01', viewValue: 'CI ALMALEGRE BARRIO CORAZÓN'},
    {value: '02', viewValue: 'CI ALMALEGRE BARRIO CRISTÓBAL'},
    {value: '02', viewValue: 'CI ALMALEGRE BARRIO EL SALADO'},
    {value: '02', viewValue: 'CI AMIGO DE LOS NIÑOS SAN JAVIER'},
  ];

  ngOnInit(): void {
  }

}

export interface Sedes {
  value: string;
  viewValue: string;
}