import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-campues-create',
  templateUrl: './campues-create.component.html',
  styleUrls: ['./campues-create.component.css']
})
export class CampuesCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder) { }

  CampusForm = this.formBuilder.group({
    TrainingCenterId:['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:['true']
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