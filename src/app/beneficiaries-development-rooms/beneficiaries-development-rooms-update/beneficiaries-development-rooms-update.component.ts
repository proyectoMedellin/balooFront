import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { EducationaAgentsAsignmentDto } from 'src/app/interfaces/educationa-agents-asignment-dto';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { EducationalAgentsService } from 'src/app/services/educational-agents.service';
import { LocationService } from 'src/app/services/location.service';
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
  public EaAssignment: EaAsignmentDto = new EaAsignmentDto();

  public BenAssignmentsForm:FormGroup = this.formBuilder.group({
    YeaEaAsignmentId:[, Validators.required],
    //Beneficiaries: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private educationalAgentsService: EducationalAgentsService,
    private dialog: MatDialog,
    private route: ActivatedRoute ,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recordRoomId = params['record'];
      this.LoadGroupAssignmentData();
    });
  }

  LoadGroupAssignmentData(){
    this.educationalAgentsService.GetGroupsYearAssignmentById(this.recordRoomId)
    .subscribe(response => {
      this.EaAssignment = response["registros"][0];
    });
  }

  Create(data: any){

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
