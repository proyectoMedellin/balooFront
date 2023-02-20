import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CampusListDto } from '../intefaces/campus-list-dto';
import { TrainingCenterListDto } from '../intefaces/training-center-list-dto';
import { CampusService } from '../services/campus.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {
  countRegisters: number = 0
  initPageSize: number = 5
  displayedColumns: string[] = ['TrainingCenterName', 'Code', 'Name', 'actions'];
  ELEMENT_DATA: CampusListDto[] = [];
  dataSource = new MatTableDataSource<CampusListDto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private campusService : CampusService
  ) { }

  ngOnInit(): void {
    this.campusService.getAllCampus(0,this.initPageSize,true).subscribe(
      data =>
      {
        this.dataSource = data["registros"];  
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
  onDelete(Id: string) {
    this.campusService.DeleteByIdCampus(Id).subscribe(response => 
      this.campusService.getAllCampus(0,this.initPageSize,true).subscribe(
        data =>
        {
          this.dataSource = data["registros"];  
          this.countRegisters = data["totalDbRegistros"];
        }
      )
      )
  }
}



