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

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css'],
})
export class TeacherReportsComponent implements OnInit {
  public initPageSize: number = 1
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'DocumentType',
    'DocumentNumber',
    'Name and Last Name',
    'Nutritional Information',
    'Emotions',
    'Attendance'
  ];
  public trainingcenter: any = [];
  public documents: any = [];
  public campus: any = [];
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
    private userservice: UsersService,
    public trainingCenterService: TrainingCenterService,
    private reportsService: ReportsService,
    private campusService: CampusService,
    private developmentRoomsService: DevelopmentRoomsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.documentsList();
    this.getEnabledBeneficiaries();
    this.trainingCenter();
  }

  getEnabledBeneficiaries() {
    this.userservice.getAllUser(0, this.initPageSize).subscribe(data =>
      {
        data["registros"][0].forEach((e: any, i: any) => {
          let doc = this.documents.find((x: any) => x.id == e.documentTypeId)
          data["registros"][0][i] = {
            ...data["registros"][0][i],
            documentTypeName: doc.name,
          }
        });;
        this.dataSource = new MatTableDataSource<any>(data["registros"][0])
        this.dataSource.paginator = this.paginator;
        // this.countUsers = data["totalDbRegistros"];
      });
    // this.reportsService
    //   .getEnabledBeneficiaries(this.options)
    //   .subscribe((data) => {
    //     this.dataSource = new MatTableDataSource<any>(data['registros']);
    //     this.dataSource.paginator = this.paginator;
    //   });
  }


  // on change campus event
  onSelectCampus(event: MatSelectChange) {
    this.getDevelopmentRooms(event.value);
  }


  // Apply Filter
  applyFilter(formValue: any) {
    const data = {
      page: 0,
      TrainingCenterId: formValue.trainingCenterId,
      CampusId: formValue.campusId,
      documentNo: formValue.documentNo,
      name: formValue.name.replace(/ /g, ""),
      group: formValue.groupName,
      DevelopmentRoomId: formValue.developmentRoomId,
      documentType: formValue.documentTypeId,
      pageSize: 100,
    };
    this.reportsService.getEnabledBeneficiaries(data).subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data['registros']);
      this.dataSource.paginator = this.paginator;
    });
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
  }
}
