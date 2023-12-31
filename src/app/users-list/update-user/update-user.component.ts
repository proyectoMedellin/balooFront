import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { LocalService } from 'src/app/services/local.service';
import { environment } from 'src/environments/environment';
import { CampusService } from '../../services/campus.service';
import { SecurityRolService } from '../../services/security-rol.service';
import { TrainingCenterService } from '../../services/training-center.service';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, AfterContentInit{
  public userEncrypt = this.localstorageservice.getData('user')!
  public user = AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8)
  public UpdateUsers = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    OldUserName: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    OtherNames: new FormControl(''),
    LastName: new FormControl('',[Validators.required]),
    OtherLastName: new FormControl(''),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UserName: new FormControl('', [Validators.required]),
    Phone: new FormControl(''),
    PrimaryKey: new FormControl('', ),
    DocumentTypeId: new FormControl('', [Validators.required]),
    DocumentNo: new FormControl('', [Validators.required]),
    TrainingCenterId: new FormControl('00000000-0000-0000-0000-000000000000'),
    CampusId: new FormControl([]),
    RolsId: new FormControl('', [Validators.required]),
    GlobalUser: new FormControl(false)
   });

  constructor(
    private route: Router,
    private formBulider: FormBuilder,
    private userservices: UsersService,
    public rolservice: SecurityRolService,
    public campusservice: CampusService,
    public trainingCenterService: TrainingCenterService,
    public localstorageservice: LocalService,
    private dialog: MatDialog,
    private alertMessage: MatSnackBar,
  ) { }

  public urlTree = this.route.parseUrl(this.route.url);
  public userName = this.urlTree.queryParams['user'];
  public userUpdate: any;
  public documents: any = [];
  public campus: any = [];
  public rols: any = [];
  public trainingcenter: any = [];
  public admin: boolean = false;
  ngOnInit(): void {
    this.Documents()
    this.Rols()
    this.Trainingcenter()
    this.Admin()
  }
  ngAfterContentInit(): void {
    this.userservices.getUser(this.userName).subscribe(data=> {
      let user= data["registros"][0]
      this.UpdateUsers.patchValue({
        Id:user["id"],
        OldUserName:user["userName"],
        FirstName: user["firstName"],
        OtherNames: user["otherNames"] != null ? user["otherNames"] : '',
        LastName: user["lastName"],
        OtherLastName: user["otherLastName"] != null ? user["otherLastName"] : '',
        UserName: user["userName"],
        Email: user["email"],
        DocumentTypeId: user["documentTypeId"],
        DocumentNo: user["documentNo"],
        TrainingCenterId: user["trainingCenterId"] != null ? user["trainingCenterId"] : '00000000-0000-0000-0000-000000000000',
        CampusId: user["campusId"] != null ? user["campusId"] : [],
        RolsId: user["rolsId"],
        Phone: user["phone"] != null ?  user["phone"] : '',
        GlobalUser: user["globalUser"]
      })
      this.Campus(user["trainingCenterId"])
    })
  }
  Admin(){
    this.rolservice.getIsAdmin(this.user).subscribe(data => this.admin = data["registros"][0])
  }
  Documents(){
    this.userservices.getAllDocuments().subscribe(data => this.documents = data["registros"][0])
  }
  Rols(){
    this.rolservice.getAllRoles().subscribe(data => this.rols = data["registros"][0])
  }
  Trainingcenter(){
    this.trainingCenterService.GetAllEnabledTraningCenter().subscribe(data => this.trainingcenter = data["registros"])
  }
  Campus(trainingCenter: string){
    if(trainingCenter != null && trainingCenter.length > 0){
      this.campusservice.getAllBytrainingCenterCampus(trainingCenter).subscribe(data => this.campus= data["registros"])
    }
  }
  UpdateRegister(Formdata: any){
    let dialogRefL: any
    setTimeout(() => {
      dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {type: 'loading',title: 'Guardando el Registro', message: 'Espere unos minutos'},
        disableClose: true
      });
    this.userservices.updateUser(Formdata).subscribe((data)=> {location.href = environment.url + "UsersList"},
    err=>{
      dialogRefL.close()
      this.alertMessage.open("Error al actualizar usuario", "Aceptar",
    {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
    location.href = environment.url + "UsersList"
    })
    }, 100)
    dialogRefL.close()
  }
}
