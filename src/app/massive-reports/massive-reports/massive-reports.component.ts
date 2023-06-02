import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { AES, enc } from 'crypto-js';
import { resolve } from 'dns';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { CampusListDto } from 'src/app/interfaces/campus-list-dto';
import { DevelopmentRoomListDto } from 'src/app/interfaces/development-room-list-dto';
import { TrainingCenterListDto } from 'src/app/interfaces/training-center-list-dto';
import { UsersListDto } from 'src/app/interfaces/users-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { DevelopmentRoomsService } from 'src/app/services/development-rooms.service';
import { EducationalAgentsService } from 'src/app/services/educational-agents.service';
import { ReportsService } from 'src/app/services/reports.service';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-massive-reports',
  templateUrl: './massive-reports.component.html',
  styleUrls: ['./massive-reports.component.css']
})
export class MassiveReportsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  errorMessage: boolean = false
  assistanceData: any
  emotionsData: any
  anthropometricData: any
  downloadFileButton = false
  public dataType: string = "";
  public userInfo!: UsersListDto;
  public allGroups: any[] = [];
  public groupsByYear: any[] = [];
  public years: any[] = [];
  public campusData: any[] = []
  public singleCampusData: any;
  public singleDevRoomData: any;
  public beneficiariesData: any[] = []
  public allFilterData: any[] = []

  initPageSize: number = 1000

  public reports = new FormGroup({
    trainingCenterId: new FormControl(''),
    campusId: new FormControl(''),
    groupNames: new FormControl(''),
  });

  public trainingCenter: TrainingCenterListDto[] = [];
  public campus: CampusListDto[] = [];
  public groups: any[] = [];
  public devRoomsList: DevelopmentRoomListDto[] = [];
  //Default Dates
  range = new FormGroup({
    from: new FormControl(moment(new Date()).subtract(1, 'months').format()),
    to: new FormControl(moment(new Date()).format()),
  });
  fromDate = moment(new Date())
    .subtract(1, 'months')
    .format('yyyy-MM-DD');
  toDate = moment(new Date()).format('yyyy-MM-DD');


  constructor(
    private educationalAgentsService: EducationalAgentsService,
    public trainingCenterService: TrainingCenterService,
    private usersService: UsersService,
    private reportsService: ReportsService,
    private campusService: CampusService,
    private developmentRoomsService: DevelopmentRoomsService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUserInfo();
  }

  public onChangeUpdated(): void {
    this.fromDate = moment(this.range.value.from).format('yyyy-MM-DD');
    this.toDate = moment(this.range.value.to).format('yyyy-MM-DD');
  }


  getDevelopmentRooms(Id: string) {
    this.developmentRoomsService
      .getAllByCampusDevRooms(Id)
      .subscribe((data) => {
        this.devRoomsList = data['registros']
          this.groups.push(this.devRoomsList)
          this.groups = this.groups.flat()
      });
  }

  getYears(){
    this.years = []
    let startDate = new Date(this.range.value.from);
    let finishDate = new Date(this.range.value.to);
    let startYear = startDate.getFullYear();
    let finishYear = finishDate.getFullYear();
    for (let year = startYear; year <= finishYear; year++) {
      this.years.push({year: year});
    }
}

  async applyFilter(formValue: any, type: string) {
      let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Obteniendo información', message: 'Espere un momento'},
        disableClose: false
      });
    this.errorMessage = false
    this.assistanceData = ""
    this.emotionsData = ""
    this.anthropometricData = ""
    this.allGroups = []
    this.groupsByYear = []
    this.campusData = []
    this.beneficiariesData = []
    this.allFilterData = []
    this.dataType = type;
    this.getYears()
    if(formValue.trainingCenterId && formValue.campusId && formValue.groupNames){
      await this.getByIdDevRooms(formValue)
      await this.getAllDataByDevRoom()
    }else if(formValue.trainingCenterId && formValue.campusId){
      await this.getByIdCampus(formValue)
      await this.getAllDataByCampus()
    }else if(formValue.trainingCenterId){
      await this.getAllByTrainingCenterCampus(formValue)
      await this.getAllData()
    }
    dialogRefL.close()
    if(!this.errorMessage){
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'successful',title: 'Información obtenida', message: '¿Desea descargar el archivo?', textButton: 'Descargar excel'},
      });
    dialogRefL.afterClosed().subscribe(result => {
      if(result){
        this.downloadFile()
      }
    })
    }
}

  async getByIdDevRooms(formValue: any){
  try{
    const data = await this.developmentRoomsService.getByIdDevRooms(formValue.groupNames).toPromise();
    this.singleDevRoomData = data['registros'][0]
  } catch (error) {
    console.error(error);
  }
  }

  async getByIdCampus(formValue: any){
    try{
      formValue.campusId.forEach(async (element: any) => {
      const data = await this.campusService.getByIdCampus(element).toPromise();
      this.campusData.push(data['registros'])
      this.campusData = this.campusData.flat()
    });
    } catch (error) {
      console.error(error);
    }
  }

  getErrorMessage(){
    let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'alert-red',title: 'No hay información con los datos solicitados', message: 'Verifique los datos', textButton: 'Aceptar'},
    });
    dialogRefL.afterClosed().toPromise();
      this.errorMessage = true;
      return
  }

  async getAllDataByDevRoom(){
    try {
      for (const y of this.years) {
        const data = await this.educationalAgentsService.getAllByYearEduAgent(0, this.initPageSize, y.year).toPromise();

          this.allGroups.push({
            DevRoom: this.singleDevRoomData.name,
            devRooms: data['registros'].filter((x: any) => x.developmentRoomId == this.singleDevRoomData.id)
          });
          this.allGroups = this.allGroups.filter((x: any) => x.devRooms.length > 0);
          if(this.allGroups.length > 0){
            for (let i = 0; i < this.allGroups.length; i++) {
              for (let y = 0; y < this.allGroups[i].devRooms.length; y++) {
                const beneficiariesData = await this.educationalAgentsService.GetBeneficiariesByGroupsYearAssignment(this.allGroups[i].devRooms[y].id).toPromise();
                this.beneficiariesData.push({ Beneficiaries: beneficiariesData['registros'] });
              }
            }
            let result = true;
            if (this.dataType == 'Asistencia') {
              result = await this.getAssistanceData();
            } else if (this.dataType == 'Emociones') {
              result = await this.getEmotionsData();
            } else if (this.dataType == 'Información Nutricional') {
              result = await this.getAnthropometricData();
            }
            if(!result){
              this.getErrorMessage()
            }
          }else{
            this.getErrorMessage()
          }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllDataByCampus(){
    try {
      for (const y of this.years) {
        const data = await this.educationalAgentsService.getAllByYearEduAgent(0, this.initPageSize, y.year).toPromise();

        this.campusData.forEach((element: any) => {
          this.allGroups.push({
            Campus: element.name,
            devRooms: data['registros'].filter((x: any) => x.campusId == element.id)
          });
        })
          this.allGroups = this.allGroups.filter((x: any) => x.devRooms.length > 0);
          if(this.allGroups.length > 0){
        for (let i = 0; i < this.allGroups.length; i++) {
          for (let y = 0; y < this.allGroups[i].devRooms.length; y++) {
            const beneficiariesData = await this.educationalAgentsService.GetBeneficiariesByGroupsYearAssignment(this.allGroups[i].devRooms[y].id).toPromise();
            this.beneficiariesData.push({ Beneficiaries: beneficiariesData['registros'] });
          }
        }
        let result = true;
        if (this.dataType == 'Asistencia') {
          result = await this.getAssistanceData();
        } else if (this.dataType == 'Emociones') {
          result = await this.getEmotionsData();
        } else if (this.dataType == 'Información Nutricional') {
          result = await this.getAnthropometricData();
        }
        if(!result){
          this.getErrorMessage()
        }
      }else{
        this.getErrorMessage()
      }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllData(){
    try {
      for (const y of this.years) {
        const data = await this.educationalAgentsService.getAllByYearEduAgent(0, this.initPageSize, y.year).toPromise();

        for (let i = 0; i < this.campusData.length; i++) {
          this.allGroups.push({
            Campus: this.campusData[i].name,
            devRooms: data['registros'].filter((x: any) => x.campusId == this.campusData[i].id)
          });
          this.allGroups = this.allGroups.filter((x: any) => x.devRooms.length > 0);
        }
        if(this.allGroups.length > 0){
        for (let i = 0; i < this.allGroups.length; i++) {
          for (let y = 0; y < this.allGroups[i].devRooms.length; y++) {
            const beneficiariesData = await this.educationalAgentsService.GetBeneficiariesByGroupsYearAssignment(this.allGroups[i].devRooms[y].id).toPromise();
            this.beneficiariesData.push({ Beneficiaries: beneficiariesData['registros'] });
          }
        }
        let result = true;
        if (this.dataType == 'Asistencia') {
          result = await this.getAssistanceData();
        } else if (this.dataType == 'Emociones') {
          result = await this.getEmotionsData();
        } else if (this.dataType == 'Información Nutricional') {
          result = await this.getAnthropometricData();
        }
        if(!result){
          this.getErrorMessage()
        }
      }else{
        this.getErrorMessage()
      }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllByTrainingCenterCampus(formValue: any) {
    try {
      const data = await this.campusService.getAllBytrainingCenterCampus(formValue.trainingCenterId).toPromise();
      this.campusData = data['registros'];
    } catch (error) {
    console.error(error);
    }
  }

  getAssistanceData(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
    let defaultString = '00000000-0000-0000-0000-000000000000';
    let observables = [];

    for (let a = 0; a < this.beneficiariesData.length; a++) {
      for (let b = 0; b < this.beneficiariesData[a].Beneficiaries.length; b++) {
        let id = this.beneficiariesData[a].Beneficiaries[b].id;
        let observable = this.reportsService.GetAssistenceDataById(id, this.fromDate, this.toDate).toPromise();
        observables.push(observable);
      }
    }

    forkJoin(observables).subscribe((responses) => {
      this.allFilterData = [];

      for (let response of responses) {
        this.allFilterData.push(response['registros']);
      }

      for (let c = 0; c < this.allFilterData.length; c++) {
        for (let d = 0; d < this.allFilterData[c].length; d++) {
          if (this.allFilterData[c][d].id !== defaultString) {
            this.allFilterData[c][d].attendant = 'Si';
          } else {
            this.allFilterData[c][d].attendant = 'No';
          }
        }
      }

      const flattenedData = this.allFilterData.flat();
      if(flattenedData.length > 0){
        const count = flattenedData.reduce((acc, item) => {
          acc[item.attendant] = (acc[item.attendant] || 0) + 1;
          return acc;
        }, {});

        const total = flattenedData.length;
        const percentageYes = (count['Si'] || 0) / total * 100;
        const percentageNo = (count['No'] || 0) / total * 100;
        const totalYes = count['Si'] || 0;
        const totalNo = count['No'] || 0;

        this.assistanceData = { total, percentageYes, percentageNo, totalYes, totalNo };
        this.downloadFileButton = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
}

  getEmotionsData() {
    return new Promise<boolean>((resolve, reject) => {
    let observables = [];

    for (let a = 0; a < this.beneficiariesData.length; a++) {
      for (let b = 0; b < this.beneficiariesData[a].Beneficiaries.length; b++) {
        let id = this.beneficiariesData[a].Beneficiaries[b].id;
        let observable = this.reportsService.GetEmotionsDataById(id, this.fromDate, this.toDate).toPromise();
        observables.push(observable);
      }
    }

    forkJoin(observables).subscribe((responses) => {
      this.allFilterData = [];

      for (let response of responses) {
        this.allFilterData.push(response['registros']);
      }

      const flattenedData = this.allFilterData.flat();
      if(flattenedData.length > 0){
        const count = flattenedData.reduce((acc, item) => {
          acc[item.emotionName] = (acc[item.emotionName] || 0) + 1;
          return acc;
        }, {});

        const total = flattenedData.length;
        const percentageNormal = (count['Normal'] || 0) / total * 100;
        const percentageSad = (count['Triste'] || 0) / total * 100;
        const percentageHappy = (count['Feliz'] || 0) / total * 100;
        const percentageConfuse = (count['Confundido'] || 0) / total * 100;
        const percentageDisgusted = (count['Disgustado'] || 0) / total * 100;
        const totalNormal = count['Normal'] || 0;
        const totalSad = count['Triste'] || 0;
        const totalHappy = count['Feliz'] || 0;
        const totalConfuse = count['Confundido'] || 0;
        const totalDisgusted = count['Disgustado'] || 0;

        this.emotionsData = {
          total,
          percentageNormal,
          percentageSad,
          percentageHappy,
          percentageConfuse,
          percentageDisgusted,
          totalNormal,
          totalSad,
          totalHappy,
          totalConfuse,
          totalDisgusted
        };
        this.downloadFileButton = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
}

  getAnthropometricData() {
    return new Promise<boolean>((resolve, reject) => {
    let observables = [];

    for (let a = 0; a < this.beneficiariesData.length; a++) {
      for (let b = 0; b < this.beneficiariesData[a].Beneficiaries.length; b++) {
        let id = this.beneficiariesData[a].Beneficiaries[b].id;
        let observable = this.reportsService.getAnthropometricDataById(id, this.fromDate, this.toDate).toPromise();
        observables.push(observable);
      }
    }

      forkJoin(observables).subscribe((responses) => {
      this.allFilterData = [];

      for (let response of responses) {
        this.allFilterData.push(response['registros']);
      }

      const flattenedData = this.allFilterData.flat();
      if(flattenedData.length > 0){
        const count = flattenedData.reduce((acc, item) => {
          acc.totalHeight = (acc.totalHeight || 0) + item.height;
          acc.countHeight = (acc.countHeight || 0) + 1;
          acc.totalBmi = (acc.totalBmi || 0) + item.bmi;
          acc.countBmi = (acc.countBmi || 0) + 1;
          acc.totalWeight = (acc.totalWeight || 0) + item.weight;
          acc.countWeight = (acc.countWeight || 0) + 1;
          return acc;
        }, {});

        const averageHeight = count.totalHeight / count.countHeight;
        const averageBmi = count.totalBmi / count.countBmi;
        const averageWeight = count.totalWeight / count.countWeight;
        const total = flattenedData.length;

        this.anthropometricData = { total, averageHeight, averageBmi, averageWeight };
        this.downloadFileButton = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
}

  getDataType(){
    let csvData
    if(this.dataType == 'Asistencia'){
      csvData = [
        ['Asistencia', 'Porcentaje de asistencia', 'Cantidad de muestras', 'Rango de consulta(fecha)'],
        ['Si', `${this.assistanceData.percentageYes}%`, this.assistanceData.totalYes, `${this.fromDate} a ${this.toDate}`],
        ['No', `${this.assistanceData.percentageNo}%`, this.assistanceData.totalNo, `${this.fromDate} a ${this.toDate}`]
      ];
    }else if(this.dataType == 'Emociones'){
      csvData = [
        ['Emociones', 'Porcentaje de emoción', 'Cantidad de muestras', 'Rango de consulta(fecha)'],
        ['Normal', `${this.emotionsData.percentageNormal}%`, this.emotionsData.totalNormal, `${this.fromDate} a ${this.toDate}`],
        ['Confundido', `${this.emotionsData.percentageConfuse}%`, this.emotionsData.totalConfuse, `${this.fromDate} a ${this.toDate}`],
        ['Triste', `${this.emotionsData.percentageSad}%`, this.emotionsData.totalSad, `${this.fromDate} a ${this.toDate}`],
        ['Disgustado', `${this.emotionsData.percentageDisgusted}%`, this.emotionsData.totalDisgusted, `${this.fromDate} a ${this.toDate}`],
        ['Feliz', `${this.emotionsData.percentageHappy}%`, this.emotionsData.totalHappy, `${this.fromDate} a ${this.toDate}`]
      ];
    } else if(this.dataType == 'Información Nutricional'){
      csvData = [
        ['Datos Antropométricos', 'Promedio', 'Rango de consulta(fecha)'],
        ['Talla', `${this.anthropometricData.averageHeight}cm`, `${this.fromDate} a ${this.toDate}`],
        ['Peso', `${this.anthropometricData.averageWeight}Kg`, `${this.fromDate} a ${this.toDate}`],
        ['IMC', `${this.anthropometricData.averageBmi}`, `${this.fromDate} a ${this.toDate}`]
      ];
    }
    return csvData
  }

  downloadFile(){
    let todayDate = moment().locale('es').format('DD/MM/YYYY-HH:mm')
    const csvData: any = this.getDataType()
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(csvData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const fileName: string = `${this.dataType}.${todayDate}.xlsx`;
    const fileURL: string = URL.createObjectURL(excelData);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;
    link.click();
  }

  public getCampus() {
    this.campus = []
      this.userInfo.campusId.forEach((e: string) => {
        this.campusService.getByIdCampus(e).subscribe(data => {
          if(data['registros'].length > 0){
            this.campus.push(data['registros'][0])
          }
        })
    });
  }

  private getTrainingCenter() {
    if(this.userInfo.globalUser == true){
      this.trainingCenterService.getAllTrainingCenter(0,this.initPageSize,true).subscribe(data => {
        this.trainingCenter = data['registros']
      })
    }else{
      this.trainingCenterService.GetByIdTraningCenter(this.userInfo.trainingCenterId).subscribe(data => {
        this.trainingCenter = data['registros']
        this.getCampus();
      })
    }
  }

  private getUserInfo() {
      let userEncrypt:string = localStorage.getItem("user")!
      let user = AES.decrypt(userEncrypt, environment.Key).toString(enc.Utf8);
      this.usersService.getUser(user).subscribe(data => {
        this.userInfo = data['registros'][0]
        this.getTrainingCenter();
      })
  }

  onSelectCampus(event: MatSelectChange) {
    this.groups = []
    event.value.forEach((element: any) => {
      this.getDevelopmentRooms(element);
    });
  }

  onSelectTrainingCenter(event: MatSelectChange){
    if(this.userInfo.globalUser == true){
    this.campus = []
    this.campusService.getAllBytrainingCenterCampus(event.value).subscribe(data => {
      this.campus = data['registros']
    })
  }
  }

  cleanForm(){
    this.reports.setValue({
      campusId: "",
      groupNames: "",
      trainingCenterId: ""
    })
  }
}
