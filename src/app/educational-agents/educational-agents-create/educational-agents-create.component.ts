import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AES, enc } from 'crypto-js';
import { EducationalAgentsService } from 'src/app/services/educational-agents.service';
import { environment } from 'src/environments/environment';
import { UsersListDto } from 'src/app/interfaces/users-list-dto';
import { UsersService } from 'src/app/services/users.service';
import { DevelopmentRoomListDto } from 'src/app/interfaces/development-room-list-dto';
import { DevelopmentRoomsService } from 'src/app/services/development-rooms.service';
import { CampusListDto } from 'src/app/interfaces/campus-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { TrainingCenterListDto } from 'src/app/interfaces/training-center-list-dto';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { MatSelectChange } from '@angular/material/select';
import { ListYearsService } from 'src/app/services/list-years.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-educational-agents-create',
  templateUrl: './educational-agents-create.component.html',
  styleUrls: ['./educational-agents-create.component.css']
})
export class EducationalAgentsCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private educationalAgentsService: EducationalAgentsService,
    private UsersService: UsersService,
    private developmentRoomsService: DevelopmentRoomsService,
    private campusService:CampusService,
    private trainingCenterService: TrainingCenterService,
    private listYearsService:ListYearsService,
    private dialog: MatDialog,
  ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public years: number[] = [];
  public trainingCenterList: TrainingCenterListDto[] = [];
  public campusList: CampusListDto[] = [];
  public devRoomsList: DevelopmentRoomListDto[] = [];
  public UsersList: UsersListDto[] = [];
  EducationalAgentsForm = this.formBuilder.group({
    TrainingcenterF: ['', Validators.required],
    SedeF: ['', Validators.required],
    DevelopmentRoomId: ['', Validators.required],
    Year:[, Validators.required],
    GroupCode:['', Validators.required],
    GroupName:['', Validators.required],
    UsersIds:[, Validators.required],
    AssignmentUser:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.years = this.listYearsService.getYears(true);
    this.Trainingcenter();
  }
  Trainingcenter(){
    this.trainingCenterService.GetAllEnabledTraningCenter().subscribe(data => this.trainingCenterList = data["registros"])
  }
  TraininSelected(event: MatSelectChange){
    this.EducationalAgentsForm.get('SedeF')?.reset();
    this.EducationalAgentsForm.get('DevelopmentRoomId')?.reset();
    this.EducationalAgentsForm.get('UsersIds')?.reset();
    this.devRoomsList = [];
    this.UsersList = []
    this.Campus(event.value)
  }
  Campus(Id:string){
    this.campusService.getAllBytrainingCenterCampus(Id).subscribe(data => this.campusList= data["registros"])
  }
  CampusSelected(event: MatSelectChange){
    this.EducationalAgentsForm.get('UsersIds')?.reset();
    this.EducationalAgentsForm.get('DevelopmentRoomId')?.reset();
    this.DevRooms(event.value);
    this.educationalAgents();
  }
  DevRooms(Id: string){
    this.developmentRoomsService.getAllByCampusDevRooms(Id).subscribe(data => this.devRoomsList = data["registros"])
  }
  educationalAgents(){
    this.UsersService.getByTraininCenterCampusRole(
      this.EducationalAgentsForm.get('TrainingcenterF')?.value,
      this.EducationalAgentsForm.get('SedeF')?.value, "Agente educativo"
      )
      .subscribe(data =>
        this.UsersList = data["registros"][0]
        )
  }
  CreateAssignEduAgents(data: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.educationalAgentsService.createAssignEduAgents(data).subscribe(response => location.href = environment.url + "EducationalAgents")
    }, 100)
    dialogRefL.close()
  }

}
