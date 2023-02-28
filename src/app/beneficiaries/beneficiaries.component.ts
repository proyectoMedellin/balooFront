import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BeneficiariesListDto, ViewGridOptions } from '../interfaces/beneficiaries-list-dto';
import { BeneficiariesService } from '../services/beneficiaries.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {
  confirmed = false;

  displayedColumns: string[] = ['DocumentTypeName', 'DocumentNumber', 'Names', 'LastNames', 'actions'];
  dataSource = new MatTableDataSource<BeneficiariesListDto>();
  options: ViewGridOptions = {
    page: 0,
    pageSize: 100
  }
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private beneficiariesService: BeneficiariesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadData()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  LoadData(){
    this.beneficiariesService.getViewGrid(this.options)
    .subscribe(data => 
      {
        this.dataSource = new MatTableDataSource<BeneficiariesListDto>( data["registros"]);  
        this.dataSource.paginator = this.paginator;
      })
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
        this.beneficiariesService.getViewGrid(this.options).subscribe(response => 
          {
            //this.ngOnInit();
            dialogRefL.close();
          })
      }
    });
  }
}



