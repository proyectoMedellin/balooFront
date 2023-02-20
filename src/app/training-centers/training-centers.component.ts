import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingCenterListDto } from '../intefaces/training-center-list-dto';
import { TrainingCenterService } from '../services/training-center.service';

@Component({
  selector: 'app-training-centers',
  templateUrl: './training-centers.component.html',
  styleUrls: ['./training-centers.component.css']
})
export class TrainingCentersComponent implements OnInit {
  countRegisters: number = 0
  initPageSize: number = 5
  displayedColumns: string[] = ['Code', 'Name', 'Update','actions'];
  ELEMENT_DATA: TrainingCenterListDto[] = [];
  dataSource = new MatTableDataSource<TrainingCenterListDto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor( private traningCenterService : TrainingCenterService) { }

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
    this.traningCenterService.DeleteByIdTraningCenter(Id).subscribe(response => 
      this.traningCenterService.getAllTrainingCenter(0,this.initPageSize,true).subscribe(
        data =>
        {
          this.ELEMENT_DATA = data["registros"];  
          this.countRegisters = data["totalDbRegistros"];
        }
      ))
  }
}

 
