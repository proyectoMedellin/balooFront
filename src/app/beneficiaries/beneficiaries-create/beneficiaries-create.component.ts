import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { LocationService } from 'src/app/services/location.service';
import { MatSelectChange } from '@angular/material/select';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-beneficiaries-create',
  templateUrl: './beneficiaries-create.component.html',
  styleUrls: ['./beneficiaries-create.component.css']
})
export class BeneficiariesCreateComponent implements OnInit {

  public isLinear: boolean = true;
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  GeneralInformationFormGroup: FormGroup = this.formBuilder.group({
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
    family: this.formBuilder.array([this.createFamilyFormGroup()],Validators.required)
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
    private dialog: MatDialog
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

  createFamilyFormGroup(): FormGroup {
    return this.formBuilder.group({
      DocumentTypeId: ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      OtherNames: [''],
      LastName: ['', Validators.required],
      OtherLastName: [''],
      FamilyRelation: ['', Validators.required],
      Attendant: [false, Validators.required]
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

  Create(){
    const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
      disableClose: true
    });
    this.beneficiariesService.create(
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
        console.log(response);
        //Cerrar modal de carga
      },
      error: error => {
        console.error(error);
        //AModal error de prueba
        const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'error',title: 'Ocurrio un error al guardar el registro', message: ''},
          
        });
      }
    })

  }
}
