import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsersListDto } from '../interfaces/users-list-dto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  confirmed = false;
  public displayedColumns: string[] = ['userName', 'email', 'firstName',
    'lastName', 'documentNo', 'Update']
  public countUsers:number = 0
  public initPageSize: number = 1
  users: UsersListDto[] = [];
  dataSource = new MatTableDataSource<UsersListDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userservices: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userservices.getAllUser(0,this.initPageSize).subscribe(data=>
      {
        this.dataSource = new MatTableDataSource<UsersListDto>(data["registros"][0]);
        this.countUsers = data["totalDbRegistros"];
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  changePage(event: PageEvent) {
    //this.roles.paginator = this.paginator
    /*this.userservices.getAllUser(event.pageIndex,event.pageSize).subscribe(data=>
      {
        this.users = new MatTableDataSource(data["registros"][0])
        this.countUsers = data["totalDbRegistros"]
      })*/
  }
  changePageIndex(event: Event) {

  }
  deletedRegister(userName: string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'alert-red',title: '¿Está seguro que desea eliminar este registro?', message: 'Esta operación es irreversible', textButton: 'Eliminar' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirmed = result;
      if (this.confirmed) {
        const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
          data: {type: 'loading',title: 'Eliminando el registro', message: 'Espere unos minutos'},
          disableClose: true
        });
        this.userservices.deletedUser(userName).subscribe(response => {
          let rData = response['registros'][0];
          if(!rData){
            const auxDialogRefL = this.dialog.open(ConfirmDialogComponent, {
              data: {type: 'alert',title: 'No se puede eliminar el registro', message: 'El usuario a eliminar tiene datos asociados, por favor elimine sus relaciones o inactivelo"'},
            });
            auxDialogRefL.afterClosed().subscribe(result => {
              location.reload();
            });
          }else{
            location.reload();
          }
        })
      }
    });
  }
}

