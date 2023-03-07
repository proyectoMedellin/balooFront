import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { LocationService } from 'src/app/services/location.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { WITHOUTDOC, WITHOUTID } from 'src/constants/app.constants';

@Component({
  selector: 'app-beneficiaries-update',
  templateUrl: './beneficiaries-update.component.html',
  styleUrls: ['./beneficiaries-update.component.css']
})
export class BeneficiariesUpdateComponent implements OnInit {

  private recordId = '';
  public isLinear: boolean = true;
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  GeneralInformationFormGroup: FormGroup = this.formBuilder.group({
    Id: ['', Validators.required],
    OrganizationId: ['', Validators.required],
    DocumentTypeId: ['', Validators.required],
    DocumentNumber: ['', Validators.required],
    FirstName: ['', Validators.required],
    OtherNames: ['', ],
    LastName: ['', Validators.required],
    OtherLastName: ['', ],
    GenderId: ['', Validators.required],
    BirthDate: ['', Validators.required],
    RhId: ['', Validators.required],
    BloodTypeId: ['', Validators.required],
    BirthCountryId:['', Validators.required],
    BirthDepartmentId:['', Validators.required],
    BirthCityId:['', Validators.required],
    CreationUser: [this.user, Validators.required],
    Enabled: [true, Validators.required],
    EmergencyPhoneNumber: ['', Validators.required]
  });

  HomeFormGroup: FormGroup = this.formBuilder.group({
    AdressZoneId: ['', Validators.required],
    Adress: ['', Validators.required],
    Neighborhood: ['', ],
    AdressPhoneNumber: ['', Validators.required],
    AdressObservations: ['', ],
  });

  familyForm: FormGroup = this.formBuilder.group({
    family: this.formBuilder.array([],Validators.required)
  });

  PhotoFormGroup: FormGroup = this.formBuilder.group({
    PhotoUrl: ['']
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
    private locationService: LocationService,
    private dialog: MatDialog,
    private route: ActivatedRoute ,
    ) {}

  async ngOnInit() {
    this.GetDocumentTypeList();
    this.GetGenderList();
    this.GetBloodTypeList();
    this.GetRhList();
    this.GetCountryList();
    this.GetZoneList();
    await this.GetFamilyRelationList();
    this.getChildInfo()
  }

  getChildInfo(){
  this.route.params.subscribe(params => {
    this.recordId = params['record']
    this.GeneralInformationFormGroup.patchValue({
      Id: this.recordId
  })
  });
  this.beneficiariesService.getById(this.recordId).subscribe(data=>
    {
      let register = data["registros"][0]
      this.GetDeparmentList(register['birthCountryId'])
      this.GetCityList(register['birthDepartmentId'])
      this.GeneralInformationFormGroup.patchValue({
        OrganizationId: register['organizationId'],
        DocumentTypeId: register['documentTypeId'],
        DocumentNumber: register['documentNumber'],
        FirstName: register['firstName'],
        OtherNames: register['otherNames'],
        LastName: register['lastName'],
        OtherLastName: register['otherLastName'],
        GenderId: register['genderId'],
        BirthDate: register['birthDate'],
        RhId: register['rhId'],
        BloodTypeId: register['bloodTypeId'],
        BirthCountryId: register['birthCountryId'],
        BirthDepartmentId: register['birthDepartmentId'],
        BirthCityId: register['birthCityId'],
        Enabled: register["enabled"],
        EmergencyPhoneNumber: register['emergencyPhoneNumber'],
      })
      this.HomeFormGroup.patchValue({
        AdressZoneId: register['adressZoneId'],
        Adress: register['adress'],
        Neighborhood: register['neighborhood'],
        AdressPhoneNumber: register['adressPhoneNumber'],
        AdressObservations: register['adressObservations'],
      })

      for(let i = 0; i < register.familyMembers.length; i++){
        this.family.push(this.updateFamilyFormGroup(register.familyMembers[i]));
      }
    }
  )
}

validateDoc(event: any){
  if(this.GeneralInformationFormGroup.value.DocumentTypeId == WITHOUTDOC){
    this.GeneralInformationFormGroup.get('DocumentNumber')?.setValue(WITHOUTID)
    this.GeneralInformationFormGroup.controls['DocumentNumber'].disable()
  }else{
    this.GeneralInformationFormGroup.get('DocumentNumber')?.setValue('')
    this.GeneralInformationFormGroup.controls['DocumentNumber'].enable()
  }
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
    return new Promise((resolve) => {
    this.beneficiariesService.getParamDataByType("FamilyRelation")
    .subscribe(data => {
      setTimeout(() => {
        this.familyRelationList = data["registros"];
        resolve(this.familyRelationList)
      }, 100)
    })
  })
  }

  createFamilyFormGroup(): FormGroup {
    return this.formBuilder.group({
      Id: ['', Validators.required],
      DocumentTypeId: ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      OtherNames: [''],
      LastName: ['', Validators.required],
      OtherLastName: [''],
      FamilyRelation: ['', Validators.required],
      Attendant: ['', Validators.required]
    });
  }

  updateFamilyFormGroup(familyMember: any): FormGroup {
    return this.formBuilder.group({
      Id: [familyMember.id, Validators.required],
      BeneficiaryId: [familyMember.beneficiaryId, Validators.required],
      OrganizationId: [familyMember.organizationId, Validators.required],
      DocumentTypeId: [familyMember.documentTypeId, Validators.required],
      DocumentNumber: [familyMember.documentNumber, Validators.required],
      FirstName: [familyMember.firstName, Validators.required],
      OtherNames: [familyMember.otherNames],
      LastName: [familyMember.lastName, Validators.required],
      OtherLastName: [familyMember.otherLastName],
      FamilyRelation: [familyMember.familyRelationId, Validators.required],
      Attendant: [familyMember.attendant, Validators.required]
    });
  }

  get family(): FormArray {
    return this.familyForm.get('family') as FormArray;
  }

  addFamilyMember() {
    this.family.push(this.createFamilyFormGroup());
  }

  removeFamilyMember(index: number) {
    this.family.removeAt(index);
  }

  onFamilyRelationSelected(event: MatSelectChange) {
    const selectedValue = event.value;
    let count = 0;
    for (let i = 0; i < this.family.length; i++) {
      const familyRelation = this.family.at(i).get('FamilyRelation')?.value;
      if (familyRelation === selectedValue) {
        count++;
      }
    }
    if (count > 1) {
      this.familyForm.get('family')?.get(`${this.family.controls.length - 1}`)?.get('FamilyRelation')?.setErrors({ 'duplicate': true });
    }

  }

  Update(){
    const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
      disableClose: true
    });
    this.beneficiariesService.updateBeneficiaries(
      this.formBuilder.group(Object.assign({},
      this.GeneralInformationFormGroup.controls,
      this.HomeFormGroup.controls,
      this.PhotoFormGroup.controls,
      this.familyForm.controls
      )).value
    ).subscribe({
      next: response => {
        location.href = environment.url + "Beneficiaries";
        dialogRefL.close()
        //Cerrar modal de carga
      },
      error: error => {
        console.error(error);
        //Aqui se pone modal de error
      }
    })

  }

}
