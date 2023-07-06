import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { DevelopmentRoomListDto } from '../interfaces/development-room-list-dto';
import { ReportViewGridOptions } from '../interfaces/report-list-dto';
import { CampusService } from '../services/campus.service';
import { DevelopmentRoomsService } from '../services/development-rooms.service';
import { ReportsService } from '../services/reports.service';
import { TrainingCenterService } from '../services/training-center.service';
import { UsersService } from '../services/users.service';
import { EducationalAgentsService } from '../services/educational-agents.service';
import { ListYearsService } from '../services/list-years.service';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css'],
})
export class TeacherReportsComponent implements OnInit {
  public initPageSize: number = 1
  years: number[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'DocumentType',
    'DocumentNumber',
    'Name and Last Name',
    // 'Nutritional Information',
    'Emotions',
    'Attendance'
  ];
  public trainingcenter: any = [];
  public documents: any = [];
  public campus: any = [];
  public agents: any = []
  public devRoomsList: DevelopmentRoomListDto[] = [];
  public options: ReportViewGridOptions = {
    page: 0,
    pageSize: 100,
  };
  public reports = new FormGroup({
    trainingCenterId: new FormControl(''),
    documentNo: new FormControl(''),
    campusId: new FormControl(''),
    name: new FormControl(''),
    developmentRoomId: new FormControl(''),
    groupName: new FormControl(''),
    documentTypeId: new FormControl(''),
  });

  constructor(
    private educationalAgentsService: EducationalAgentsService,
    private userservice: UsersService,
    public trainingCenterService: TrainingCenterService,
    private reportsService: ReportsService,
    private campusService: CampusService,
    private developmentRoomsService: DevelopmentRoomsService,
    private listYearsService: ListYearsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.years = this.listYearsService.getYears(false);
    await this.documentsList();
    await this.getTeachersWithDevRooms();
    this.getTeachers();
    this.trainingCenter();
  }

  async getTeachersWithDevRooms(){
    for (const y of this.years) {
    let data = await this.educationalAgentsService.getAllByYearEduAgent(0, 1000, y).toPromise();
    this.agents.push(data['registros'])
    }
    this.agents = this.agents.flat()
  }

  async getTeachers() {
    let data = await this.userservice.getAllUser(0, this.initPageSize).toPromise()
        data["registros"][0].forEach((e: any, i: any) => {
          let doc = this.documents.find((x: any) => x.id == e.documentTypeId)
          let devRoomByUser = this.agents.find((x: any) => x.agentsId.includes(data['registros'][0][i].id))
          data["registros"][0][i] = {
            ...data["registros"][0][i],
            documentTypeName: doc.name,
            devRoom: !devRoomByUser ? '' : devRoomByUser.developmentRoomId,
            groupName: !devRoomByUser ? '' : `${devRoomByUser.groupCode} ${devRoomByUser.groupName}`,
            fullName: `${data["registros"][0][i].firstName} ${data["registros"][0][i].otherNames} ${data["registros"][0][i].lastName} ${data["registros"][0][i].otherLastName}`
          }
        });
        this.dataSource = new MatTableDataSource<any>(data["registros"][0].filter((x: any) => x.documentTypeId != "b6dda96b-a81b-d212-c68c-9f35ffc21eba"))
        this.dataSource.paginator = this.paginator;
        await this.getTeachersInfo()
}

  async getTeachersInfo(){
    for (let i = 0; i < this.dataSource.data.length; i++) {
      let teacherInfo: any = await this.userservice.getUser(this.dataSource.data[i].email).toPromise();
      teacherInfo = teacherInfo["registros"][0];
      this.dataSource.data[i] = {
        ...this.dataSource.data[i],
        campusId: teacherInfo.campusId,
      };
    }
  }


  // on change campus event
  onSelectCampus(event: MatSelectChange) {
    this.getDevelopmentRooms(event.value);
  }


  // Apply Filter
  async applyFilter(formValue: any) {
    await this.getTeachers();
    if(formValue.trainingCenterId){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.trainingCenterId == formValue.trainingCenterId)
    }if(formValue.campusId){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.campusId.includes(formValue.campusId));
    }if(formValue.developmentRoomId){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.devRoom == formValue.developmentRoomId)
    }if(formValue.groupName){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.groupName.toLowerCase().includes(formValue.groupName.toLowerCase()))
    }if(formValue.documentTypeId){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.documentTypeId == formValue.documentTypeId)
    }if(formValue.documentNo){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.documentNo == formValue.documentNo)
    }if(formValue.name){
      this.dataSource.data = this.dataSource.data.filter((x: any) => x.fullName.toLowerCase().includes(formValue.name.toLowerCase()))
    }
  }

  getDevelopmentRooms(Id: string) {
    this.developmentRoomsService
      .getAllByCampusDevRooms(Id)
      .subscribe((data) => (this.devRoomsList = data['registros']));
  }

  private trainingCenter(): void {
    this.trainingCenterService
      .GetAllEnabledTraningCenter()
      .subscribe((data) => {
        this.trainingcenter = data['registros'];
      });
  }

  private async documentsList(): Promise<void> {
    let data: any = await this.userservice.getAllDocuments().toPromise()
    this.documents = data['registros'][0]
    // this.userservice
    //   .getAllDocuments()
    //   .subscribe((data) => (this.documents = data['registros'][0]));
  }

  public campusList(trainingCenter: any): void {
    this.reports.get('campusId')?.setValue('')
    this.campusService
      .getAllBytrainingCenterCampus(trainingCenter)
      .subscribe((data) => (this.campus = data['registros']));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cleanForm(){
    this.reports.setValue({
      campusId: "",
      developmentRoomId: "",
      documentNo: "",
      documentTypeId: "",
      groupName: "",
      name: "",
      trainingCenterId: ""
    })
    this.getTeachers();
  }
}
