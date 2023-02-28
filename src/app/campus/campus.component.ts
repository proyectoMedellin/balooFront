import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CampusListDto } from '../interfaces/campus-list-dto';
import { CampusService } from '../services/campus.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {
  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 1000
  displayedColumns: string[] = ['TrainingCenterCode', 'TrainingCenterName', 'Code', 'Name', 'actions'];
  dataSource = new MatTableDataSource<CampusListDto>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private campusService : CampusService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.campusService.getAllCampus(0,this.initPageSize,true).subscribe(
      data =>
      {
        this.dataSource = new MatTableDataSource<CampusListDto>( data["registros"]);  
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
        this.campusService.deleteByIdCampus(Id).subscribe(response => 
          {
            this.ngOnInit();
            dialogRefL.close();
          })
      }
    });
  }
}



