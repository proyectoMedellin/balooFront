import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TrainingCenterListDto } from '../intefaces/training-center-list-dto';
import { TrainingCenterService } from '../services/training-center.service';

@Component({
  selector: 'app-training-centers',
  templateUrl: './training-centers.component.html',
  styleUrls: ['./training-centers.component.css']
})
export class TrainingCentersComponent implements OnInit {
  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 5
  displayedColumns: string[] = ['Code', 'Name','actions'];
  ELEMENT_DATA: TrainingCenterListDto[] = [];
  dataSource = new MatTableDataSource<TrainingCenterListDto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor( 
    private traningCenterService : TrainingCenterService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.traningCenterService.getAllTrainingCenter(0,this.initPageSize,true).subscribe(
      data =>
      {
        this.ELEMENT_DATA = data["registros"];  
        this.countRegisters = data["totalDbRegistros"];
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  changePage(event: PageEvent) {
    /*this.traningCenterService.getAllTrainingCenter(event.pageIndex,event.pageSize,true).subscribe(data=>
      {
        this.ELEMENT_DATA = new MatTableDataSource(data["registros"])  
        this.countRegisters = data["totalDbRegistros"]
      })*/
  }

  onDelete(Id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {type: 'alert-red',title: '¿Está seguro que desea eliminar este registro?', message: 'Esta operación es irreversible', textButton: 'Eliminar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmed = result;
      if (this.confirmed) {
        this.traningCenterService.DeleteByIdTraningCenter(Id).subscribe(response => 
              this.traningCenterService.getAllTrainingCenter(0,this.initPageSize,true).subscribe(
                data =>
                {
                  this.ELEMENT_DATA = data["registros"];  
                  this.countRegisters = data["totalDbRegistros"];
                }
              ))
      }
    });
  }
}

 
