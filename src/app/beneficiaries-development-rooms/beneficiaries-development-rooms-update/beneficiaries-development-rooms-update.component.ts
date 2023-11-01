import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { BeneficiaryBaseInfoDto } from 'src/app/interfaces/beneficiary-base-info-dto';
import { EducationaAgentsAsignmentDto } from 'src/app/interfaces/educationa-agents-asignment-dto';
import { ReportViewGridOptions } from 'src/app/interfaces/report-list-dto';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { EducationalAgentsService } from 'src/app/services/educational-agents.service';
import { LocationService } from 'src/app/services/location.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beneficiaries-development-rooms-update',
  templateUrl: './beneficiaries-development-rooms-update.component.html',
  styleUrls: ['./beneficiaries-development-rooms-update.component.css']
})
export class BeneficiariesDevelopmentRoomsUpdateComponent implements OnInit {

  private recordRoomId = '';
  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);
  public documentTypeList: any = [];
  public EaAssignment: EaAsignmentDto = new EaAsignmentDto();

  public BenSearchForm:FormGroup = this.formBuilder.group({
    DocumentTypeId:[],
    DocumentNumber:[],
    Names:[],
    BeneficiariesToAssign: this.formBuilder.array([])
  });

  public BenAssignmentsForm:FormGroup = this.formBuilder.group({
    DevelopmentRoomGroupByYearId:[, Validators.required],
    AssignamentUser:[, Validators.required],
    Beneficiaries: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private educationalAgentsService: EducationalAgentsService,
    private userServices: UsersService,
    private reportsService: ReportsService,
    private dialog: MatDialog,
    private route: ActivatedRoute ,
  ) { }

  ngOnInit(): void {
    this.GetDocumentTypeList();
    this.route.params.subscribe(params => {
      this.recordRoomId = params['record'];
      this.BenAssignmentsForm.patchValue({
        DevelopmentRoomGroupByYearId: this.recordRoomId,
        AssignamentUser: this.user
      });
      this.LoadGroupAssignmentData();
    });
  }

  GetDocumentTypeList(){
    this.userServices.getAllDocuments().subscribe(data => this.documentTypeList = data["registros"][0])
  }

  LoadGroupAssignmentData(){
    this.educationalAgentsService.GetGroupsYearAssignmentById(this.recordRoomId)
    .subscribe(response => {
      this.EaAssignment = response["registros"][0];
    });
    this.educationalAgentsService.GetBeneficiariesByGroupsYearAssignment(this.recordRoomId)
    .subscribe(response => {
      let registros: BeneficiaryBaseInfoDto[] = response['registros'];
      registros.forEach((ben:BeneficiaryBaseInfoDto) => {
        this.Beneficiaries.push(this.BeneficiariesListFormData(
          ben.id, ben.documentTypeName, ben.documentNumber,
          (ben.firstName + " " + ben.otherNames+ " "  + ben.lastName+ " "  + ben.otherLastName)));
      });

    });
  }

  Create(data: any){
    const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
      disableClose: true
    });
    this.educationalAgentsService.assignBeneficiariesToDevRoom(data).subscribe({
      next: response => {
        location.href = environment.url + "BeneficiariesDevelopmentRooms";
        dialogRefL.close()
        //Cerrar modal de carga
      },
      error: error => {
        alert(error);
        dialogRefL.close()
        //Aqui se pone modal de error
      }
    })

  }

  Search(filterData: any){
    this.BeneficiariesToAssign.clear();
    const data = {
      page: 0,
      documentNo: filterData.DocumentNumber,
      name: filterData.Names,
      documentType: filterData.DocumentTypeId,
      pageSize: 100,
    };
    this.reportsService.getEnabledBeneficiaries(data).subscribe((data) => {
      let registros = data['registros']
      registros.forEach((ben:BeneficiaryBaseInfoDto) => {
        this.BeneficiariesToAssign.push(this.BeneficiariesListFormData(
          ben.id, ben.documentTypeName, ben.documentNumber,
          (ben.firstName + " " + ben.otherNames+ " "  + ben.lastName+ " "  + ben.otherLastName)));
      });
    });
  }

  BeneficiariesListForm(){
    return this.formBuilder.group({
      Id: [],
      DocumentType: [],
      DocumentNumber: [],
      Names: [],
      Assigned: [, Validators.required]
    });
  }

  BeneficiariesListFormData(id:string, docType:string, docNumber:string, names:string){
    return this.formBuilder.group({
      Id: [id],
      DocumentType: [docType],
      DocumentNumber: [docNumber],
      Names: [names]
    });
  }

  get BeneficiariesToAssign(){
    return this.BenSearchForm.get("BeneficiariesToAssign") as FormArray;
  }

  get Beneficiaries(){
    return this.BenAssignmentsForm.get("Beneficiaries") as FormArray;
  }

  AddBeneficiaryToAssign(index:number){
    this.Beneficiaries.push(this.BeneficiariesToAssign.at(index));
    this.BeneficiariesToAssign.removeAt(index);
  }

  removeTempBeneficiaries(index:number){
    this.Beneficiaries.removeAt(index);
  }
}

export class EaAsignmentDto implements EducationaAgentsAsignmentDto{
  trainingCenterId: string = "";
  trainingCenterCode: string = "";
  trainingCenterName: string = "";
  campusId: string = "";
  campusCode: string = "";
  campusName: string = "";
  developmentRoomId: string = "";
  developmentRoomCode: string = "";
  developmentRoomName: string = "";
  year: number = 0;
  groupCode: string = "";
  groupName: string = "";
  agents: string[] = [];
  agentsId: string[] = [];
  id: string = "";
  organizationId: string = "";
  organizationName: string = "";
  enabled: boolean = false;
  createdBy: string = "";
  createdOn: Date = new Date();
  modifiedBy: string = "";
  modifiedOn: Date = new Date();
}
