import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EducationalAgentsListDto } from '../intefaces/educational-agents-list-dto';
import { EducationalAgentsService } from '../services/educational-agents.service';
@Component({
  selector: 'app-educational-agents',
  templateUrl: './educational-agents.component.html',
  styleUrls: ['./educational-agents.component.css']
})
export class EducationalAgentsComponent implements OnInit {
  confirmed = false;
  countRegisters: number = 0
  initPageSize: number = 1000
  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'DevelopmentRoomName', 
  'GroupCode', 'GroupName', 'Year', 'EducationalAgentName', 'actions'];
  dataSource = new MatTableDataSource<EducationalAgentsListDto>();

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  constructor(
    private dialog: MatDialog,
    private educationalAgentsService: EducationalAgentsService
  ) { }

  ngOnInit(): void {
    this.educationalAgentsService.getAllEduAgent(0,this.initPageSize).subscribe(
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
            this.ngOnInit();
            dialogRefL.close();
          }
         )
      }
    });

  }
}
