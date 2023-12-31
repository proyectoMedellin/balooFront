import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EducationalAgentsListDto } from '../interfaces/educational-agents-list-dto';
import { EducationalAgentsService } from '../services/educational-agents.service';
import { ListYearsService } from '../services/list-years.service';
@Component({
  selector: 'app-educational-agents',
  templateUrl: './educational-agents.component.html',
  styleUrls: ['./educational-agents.component.css']
})
export class EducationalAgentsComponent implements OnInit {
  years: number[] = []
  selectedYear: number = new Date().getFullYear();
  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 1000
  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'DevelopmentRoomName',
  'GroupCode', 'GroupName', 'Year', 'EducationalAgentName', 'actions'];
  dataSource = new MatTableDataSource<EducationalAgentsListDto>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private dialog: MatDialog,
    private educationalAgentsService: EducationalAgentsService,
    private listYearsService:ListYearsService
  ) { }

  ngOnInit(): void {
    this.years = this.listYearsService.getYears(false);
    this.onReloadList()
  }
  onReloadList(){
    this.educationalAgentsService.getAllByYearEduAgent(0,this.initPageSize,this.selectedYear).subscribe(
      data =>
      {
        this.dataSource = new MatTableDataSource<EducationalAgentsListDto>( data["registros"]);
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
  formatAgents(agents: string[]): string {
    return agents.join(',\n');
  }
  onDelete(Id: string){
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
        this.educationalAgentsService.deleteByIdEduAgent(Id).subscribe(response =>
          {
            let rData = response['registros'][0];
            if(!rData){
              const auxDialogRefL = this.dialog.open(ConfirmDialogComponent, {
                data: {type: 'alert',title: 'No se puede eliminar el registro', message: 'El registro a eliminar tiene datos asociados, por favor elimine sus relaciones o inactivelo"'},
                disableClose: true
              });
            }
            this.ngOnInit();
            dialogRefL.close();
          }
         )
      }
    });

  }
}
