import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { WorkingDayDto } from '../intefaces/working-day-dto';
import { WorkDaysService } from '../services/work-days.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 1000
  displayedColumns: string[] = ['Year', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday','actions'];
  dataSource = new MatTableDataSource<WorkingDayDto>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private workDaysServices: WorkDaysService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.workDaysServices.getAll().subscribe(
      data =>{
        this.dataSource = new MatTableDataSource<WorkingDayDto>(data["registros"]);
        this.countRegisters = data["totalDbRegistros"];
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

  onDelete(year: number){
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
        this.workDaysServices.Delete(year).subscribe(
          response => this.workDaysServices.getAll().subscribe(
            data => {
              this.dataSource = new MatTableDataSource<WorkingDayDto>(data["registros"]);
              this.countRegisters = data["totalDbRegistros"];
              this.dataSource.paginator = this.paginator;
              dialogRefL.close();
            }
          )
        )
      }
    });
  }
}


