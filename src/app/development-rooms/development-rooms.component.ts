import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DevelopmentRoomListDto } from '../interfaces/development-room-list-dto';
import { DevelopmentRoomsService } from '../services/development-rooms.service';
@Component({
  selector: 'app-development-rooms',
  templateUrl: './development-rooms.component.html',
  styleUrls: ['./development-rooms.component.css']
})
export class DevelopmentRoomsComponent implements OnInit {
  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 1000
  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'Code', 'Name', 'actions'];
  dataSource = new MatTableDataSource<DevelopmentRoomListDto>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private developmentRoomsService : DevelopmentRoomsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.developmentRoomsService.getAllDevRooms(0,this.initPageSize,true).subscribe(
      data =>
      {
        this.dataSource = new MatTableDataSource<DevelopmentRoomListDto>( data["registros"]);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  onDelete(Id: string) {
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
        this.developmentRoomsService.deleteByIdDevRooms(Id).subscribe(response =>
          {
            let rData = response['registros'][0];
            if(!rData){
              const auxDialogRefL = this.dialog.open(ConfirmDialogComponent, {
                data: {type: 'alert',title: 'No se puede eliminar el registro', message: 'La sala a eliminar tiene datos asociados, por favor elimine sus relaciones o inactivelo"'},
                disableClose: true
              });
            }
            this.ngOnInit();
            dialogRefL.close();
          })
      }
    });
  }
}
