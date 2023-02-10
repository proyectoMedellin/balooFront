import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingCenterListDto } from '../intefaces/training-center-list-dto';

@Component({
  selector: 'app-training-centers',
  templateUrl: './training-centers.component.html',
  styleUrls: ['./training-centers.component.css']
})
export class TrainingCentersComponent implements OnInit {

  displayedColumns: string[] = ['Code', 'Name', 'Update'];
  dataSource = new MatTableDataSource<TrainingCenterListDto>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}

const ELEMENT_DATA: TrainingCenterListDto[] = [
  {Id: 'weqfwergrgwrgw45', Code: '01', Name: 'CI ALMALEGRE'},
  {Id: 'weqfwergrgwrgw44', Code: '02', Name: 'CI AMIGO DE LOS NIÑOS'},
];
