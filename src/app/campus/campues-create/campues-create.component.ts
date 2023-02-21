import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AES, enc } from 'crypto-js';
import { CampusService } from 'src/app/services/campus.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campues-create',
  templateUrl: './campues-create.component.html',
  styleUrls: ['./campues-create.component.css']
})
export class CampuesCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private campusService: CampusService
    ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  CampusForm = this.formBuilder.group({
    TrainingCenterId:['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:['true'],
    CreatedBy:[this.user, Validators.required]
  });

  listaCentros: CentrosFormacion[] = [
    {value: '01', viewValue: 'CI ALMALEGRE'},
    {value: '02', viewValue: 'CI AMIGO DE LOS NIÑOS'}
  ];

  ngOnInit(): void {
  }

}
export interface CentrosFormacion {
  value: string;
  viewValue: string;
}