import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-beneficiaries-create',
  templateUrl: './beneficiaries-create.component.html',
  styleUrls: ['./beneficiaries-create.component.css']
})
export class BeneficiariesCreateComponent implements OnInit {

  public isLinear: boolean = true;
  GeneralInformationFormGroup: FormGroup = this.formBuilder.group({
    DocumentTypeId: ['', Validators.required],
    DocumentNumber: ['', Validators.required],
    FirstName: ['', Validators.required],
    OtherNames: ['', ],
    LastName: ['', Validators.required],
    OtherLastNames: ['', ],
    Gender: ['', Validators.required],
    BirthDate: ['', Validators.required],
    RH: ['',],
    BloodType: ['',],
    BirthCountryId:['', Validators.required],
    BirthDepartmentId:['', Validators.required],
    BirthCityId:['', Validators.required],
  });

  HomeFormGroup: FormGroup = this.formBuilder.group({
    Zone: ['', Validators.required],
    Address: ['', Validators.required],
    Neighborhood: ['', ],
    PhoneNumber: ['', Validators.required],
    Observations: ['', ],
  });

  FamilyFormGroup: FormGroup = this.formBuilder.group({
    FdocumentTypeId: ['', Validators.required],
    FdocumentNumber: ['', Validators.required],
    FfirstName: ['', Validators.required],
    FotherNames: ['', ],
    FlastName: ['', Validators.required],
    FotherLastNames: ['', ],
    FrelationType: ['', Validators.required]
  });  
  
  PhotoFormGroup: FormGroup = this.formBuilder.group({
    Photo: ['']
  });  
  
  public documentTypeList: any = [];
  public genderList: any = [];
  public rhList: any = [];
  public bloodTypeList: any = [];
  public countryList: any = [];
  public departmentList: any = [];
  public cityList: any = [];
  public zoneList: any = [];
  public familyRelationList: any = [];

  constructor(private formBuilder: FormBuilder, public userservice: UsersService,) {}

  ngOnInit(): void {
    this.GetDocumentTypeList();
    this.GetGenderList();
    this.GetBloodTypeList();
    this.GetRhList();
    this.GetCountryList();
    this.GetDeparmentList();
    this.GetCityList();
    this.GetZoneList();
    this.GetFamilyRelationList();
  }

  GetDocumentTypeList(){
    this.userservice.getAllDocuments().subscribe(data => this.documentTypeList = data["registros"][0])
  }

  GetGenderList(){
    this.genderList[0] = {id: 'H', name: 'Hombre'};
    this.genderList[1] = {id: 'M', name: 'Mujer'};
  }

  GetRhList(){
    this.rhList[0] = {id: 'P', name: 'Positivo'};
    this.rhList[1] = {id: 'N', name: 'Negativo'};
  }

  GetBloodTypeList(){
    this.bloodTypeList[0] = {id: 'A', name: 'A'};
    this.bloodTypeList[1] = {id: 'B', name: 'B'};
    this.bloodTypeList[2] = {id: 'AB', name: 'AB'};
    this.bloodTypeList[3] = {id: 'O', name: 'O'};
  }

  GetCountryList(){
    this.countryList[0] = {id: 'CO', name:'Colombia'}
    this.countryList[1] = {id: 'OTHER', name:'Otro país'}
  }

  GetDeparmentList(){
    this.departmentList[0] = {id: 'A', name:'Antioquia'}
    this.departmentList[1] = {id: 'OD', name:'Otro departamento'}
    this.departmentList[2] = {id: 'OC', name:'Otro país'}
  }

  GetCityList(){
    this.cityList[0] = {id: 'M', name:'Medellin'}
    this.cityList[1] = {id: 'OC', name:'Otra ciudad'}
    this.cityList[2] = {id: 'OP', name:'Otro país'}
  }

  GetZoneList(){
    this.zoneList[0] = {id: 'Rural', name:'Rural'}
    this.zoneList[1] = {id: 'Urbana', name:'Urbana'}
  }

  GetFamilyRelationList(){
    this.familyRelationList[0] = {id: 'P', name:'Padre'}
    this.familyRelationList[1] = {id: 'M', name:'Madre'}
    this.familyRelationList[2] = {id: 'O', name:'Otro'}
  }
}
