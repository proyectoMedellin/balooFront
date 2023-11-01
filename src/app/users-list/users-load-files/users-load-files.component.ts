import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';
import { CorreoService } from 'src/app/services/correo.service';
import { SecurityRolService } from 'src/app/services/security-rol.service';
import { CampusListDto } from 'src/app/interfaces/campus-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { TrainingCenterListDto } from 'src/app/interfaces/training-center-list-dto';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { LocalService } from 'src/app/services/local.service';
import { resolve } from 'dns';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-load-files',
  templateUrl: './users-load-files.component.html',
  styleUrls: ['./users-load-files.component.css']
})
export class UsersLoadFilesComponent implements OnInit {

  @ViewChild(MatTableExporterDirective) exporter!: MatTableExporterDirective;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isExcelFile: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  public fileName: string = '';
  public selectedFile: any;
  public documentTypeList: any = [];
  public roles: any = [];
  public campus: any = []
  public trainingCenter: any = []
  initPageSize: number = 1000
  showTable = false
  displayedColumns: string[] = ['UserName', 'Email', 'DocumentTypeId', 'DocumentNo', 'FirstName', 'OtherNames', 'LastName', 'OtherLastName'/* 'GlobalUser'*/, 'Phone', 'RolsId', 'TrainingCenterId', 'CampusId'];
  public dataSource = new MatTableDataSource<any>();

  public userEncrypt = this.localstorageservice.getData('user')!
  public user = AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8)

  constructor(
    public localstorageservice: LocalService,
    private formBuilder: FormBuilder,
    public userservice: UsersService,
    private alertMessage: MatSnackBar,
    private correoservice: CorreoService,
    private rolesService : SecurityRolService,
    private campusService : CampusService,
    private traningCenterService : TrainingCenterService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userservice.getAllDocuments().subscribe(data => this.documentTypeList = data['registros'][0])
    this.rolesService.getAllRoles().subscribe(data => this.roles = new MatTableDataSource(data["registros"][0]))
    this.campusService.getAllCampus(0, this.initPageSize, true).subscribe(data => this.campus = new MatTableDataSource<CampusListDto>( data["registros"]));
    this.traningCenterService.getAllTrainingCenter(0,this.initPageSize,true).subscribe(data => this.trainingCenter = new MatTableDataSource<TrainingCenterListDto>( data["registros"]));
  }

  exportTable() {
    // console.log(this.exporter)
    this.exporter.exportTable('xlsx', {fileName: 'UsersFile'});
  }

  userForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    documentTypeId: ['', Validators.required],
    documentNo: ['', Validators.required],
    firstName: ['', Validators.required],
    otherNames: [''],
    lastName: ['', Validators.required],
    otherLastName: [''],
    globalUser: [false, Validators.required],
    phone: ['', Validators.required],
    rolsId: [[''], Validators.required],
    trainingCenterId: ['', Validators.required],
    campusId: [[''], Validators.required],
    createdBy: [this.user],
    oldUserName: ['', Validators.required],
  });

  loadFile(event: any){
    this.fileName = event.target.files[0].name
    this.selectedFile = event.target.files[0]
  }

  uploadFile(){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
      this.loadExcelFile()
    }, 1000)
    dialogRefL.close()
  }

  loadExcelFile(): void {
    const file = this.selectedFile;
    if (file.type !== this.isExcelFile) {
      this.alertMessage.open("Por favor ingrese el archivo de excel", "Aceptar",
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const workbook = XLSX.read(reader.result, {type: 'binary'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
      const headers: any = data[0];
      const values = data.slice(1);

      const objects = values.map((row: any) => {
        const object: any = {};
        headers.forEach((header: any, index: any) => {
          object[this.displayedColumns[index]] = row[index];
        });
        return object;
      });

      this.dataSource.data = objects;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      let registerCount = 0; // variable to keep track of the number of registers added to the form
      const maxRegisters = 500;

      // Set form values
      for (let i = 0; i < values.length; i++) {
        let e: any = values[i];
        if (registerCount < maxRegisters) {
        let documentId = this.GetDocumentTypeList(e[2])
        let RolId = this.GetRolesList(e[9])
        let CampusId = this.GetCampusList(e[11])
        let trainingCenterId = this.GetTrainingCenterList(e[10])
        this.userForm.patchValue({
          userName: e[0],
          email: e[1],
          documentTypeId: documentId.id,
          documentNo: String(e[3]),
          firstName: e[4],
          otherNames: e[5],
          lastName: e[6],
          otherLastName: e[7],
          // globalUser: false,
          phone: String(e[8]),
          rolsId: RolId.id.split('; '),
          trainingCenterId: trainingCenterId.id,
          campusId: CampusId.id.split('; '),
          createdBy: this.user,
          oldUserName: e[0]
        });
        await this.validateUserName(this.userForm.value)
        registerCount++;
      } else {
        break;
      }
      }
    };
    reader.readAsBinaryString(file);
  }

  GetDocumentTypeList(item: any){
    let prueba = this.documentTypeList.find((doc: any) => doc.code == item)
    return prueba
  }

  GetRolesList(item: any){
    let prueba = this.roles.filteredData.find((doc: any) => doc.name == item)
    return prueba
  }

  GetCampusList(item: any){
    let prueba = this.campus.filteredData.find((doc: any) => doc.code == item)
    return prueba
  }

  GetTrainingCenterList(item: any){
    let prueba = this.trainingCenter.filteredData.find((doc: any) => doc.code == item)
    return prueba
  }

  validateUserName(formdata: any){
    return new Promise((resolve) => {
      this.userservice.existUserName(this.userForm.getRawValue()['userName']).subscribe((data)=> {
        setTimeout(() => {
          if (data["registros"][0] == false){
            this.SignUp(formdata)
          }else{
            this.UpdateRegister(formdata)
          }
          resolve(formdata)
        }, 100)
      })
    })

  }

  SignUp(data: any){
    this.userservice.register(data).subscribe(response => {
      if(response['codigoRespuesta'] == "PreconditionFailed"){
        setTimeout(() => {
          let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
            data: {type: 'alert', title: 'Error', message: 'Carga con errores identificados'},
            disableClose: true
          });
          dialogRefL.close()
        },1000)
      }else{
        let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'alert', title: 'Guardando el Registro', message: 'Espere unos minutos'},
          disableClose: true
        });
        dialogRefL.close()
        this.sendNotificacion()
      }
    },err => {
      setTimeout(() => {
        let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'alert', title: 'Error', message: 'Carga con errores identificados'},
          disableClose: true
        });
        dialogRefL.close()
      },1000)
    });
   }

   sendNotificacion(){
    let text = `${this.userForm.get("userName")?.value}||${moment().locale('es').format()}`
    let textEncrypt = AES.encrypt(text, environment.Key).toString()
    let urlpassword = environment.url + "ChangePassword?DateRecover=" + textEncrypt
    let dataUser = {Body:urlpassword, UserName:this.userForm.get("userName")?.value, Subject:"Asignar clave"}

    this.correoservice.sendEmailRecover(this.userForm.getRawValue()['userEmail'], dataUser).subscribe(
        (response: any) => {location.href = environment.url + "UsersList"}
      )
  }
  UpdateRegister(Formdata: any){
    this.userservice.updateUser(Formdata).subscribe((data) => {
      if(data['codigoRespuesta'] == "PreconditionFailed"){
        setTimeout(() => {
          let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
            data: {type: 'alert', title: 'Error', message: 'Carga con errores identificados'},
            disableClose: true
          });
          dialogRefL.close()
        }, 1000)
      }else{
        let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'loading', title: 'Guardando el Registro', message: 'Espere unos minutos'},
          disableClose: true
        });
        dialogRefL.close()
        location.href = environment.url + "UsersList"
      }
    },err => {
      setTimeout(() => {
        let dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'alert', title: 'Error', message: 'Carga con errores identificados'},
          disableClose: true
        });
        dialogRefL.close()
      }, 1000)
    });
  }
}
