import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { LocationService } from 'src/app/services/location.service';
import { MatSelectChange } from '@angular/material/select';

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
    OtherLastName: ['', ],
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

  constructor(
    private formBuilder: FormBuilder,
    public userservice: UsersService,
    private beneficiariesService: BeneficiariesService,
    private locationService: LocationService
    ) {}

  ngOnInit(): void {
    this.GetDocumentTypeList();
    this.GetGenderList();
    this.GetBloodTypeList();
    this.GetRhList();
    this.GetCountryList();
    this.GetZoneList();
    this.GetFamilyRelationList();
  }

  GetDocumentTypeList(){
    this.userservice.getAllDocuments().subscribe(data => this.documentTypeList = data["registros"][0])
  }

  GetGenderList(){
    this.beneficiariesService.getParamDataByType("Gender")
    .subscribe(data => this.genderList = data["registros"])
  }
  

  GetRhList(){
    this.beneficiariesService.getParamDataByType("RH")
    .subscribe(data => this.rhList = data["registros"])
  }

  GetBloodTypeList(){
    this.beneficiariesService.getParamDataByType("BloodType")
    .subscribe(data => this.bloodTypeList = data["registros"])
  }

  GetCountryList(){
    this.locationService.getCountryList().subscribe(
      data => this.countryList = data["registros"]
    )
  }
  CountrySelected(event: MatSelectChange){
    this.GeneralInformationFormGroup.get('BirthDepartmentId')?.reset();
    this.GeneralInformationFormGroup.get('BirthCityId')?.reset();
    this.cityList = [];
    this.GetDeparmentList(event.value);
  }

  GetDeparmentList(id: string){
    this.locationService.getDepartmentsByCountry(id).subscribe(
      data => this.departmentList = data["registros"]
    )
  }
  DepartamentSelected(event: MatSelectChange){
    this.GeneralInformationFormGroup.get('BirthCityId')?.reset();
    this.GetCityList(event.value)
  }

  GetCityList(id: string){
    this.locationService.GetCitiesByDeparment(id).subscribe(
      data => this.cityList = data["registros"]
    )
  }

  GetZoneList(){
    this.beneficiariesService.getParamDataByType("zone")
    .subscribe(data => this.zoneList = data["registros"])
  }

  GetFamilyRelationList(){
    this.beneficiariesService.getParamDataByType("FamilyRelation")
    .subscribe(data => this.familyRelationList = data["registros"])
  }
  Create(){
    console.log(
      this.HomeFormGroup,
      this.PhotoFormGroup,
      this.FamilyFormGroup,
      this.GeneralInformationFormGroup
    )
  }
}
