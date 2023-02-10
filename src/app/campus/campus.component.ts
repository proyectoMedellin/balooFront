import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CampusListDto } from '../intefaces/campus-list-dto';
import { TrainingCenterListDto } from '../intefaces/training-center-list-dto';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  displayedColumns: string[] = ['TrainingCenterName', 'Code', 'Name'];
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

const ELEMENT_DATA: CampusListDto[] = [
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', Code: '011', Name: 'CI ALMALEGRE BARRIO CORAZÓN'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', Code: '012', Name: 'CI ALMALEGRE BARRIO CRISTÓBAL'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', Code: '013', Name: 'CI ALMALEGRE BARRIO EL SALADO'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'02' , TrainingCenterName:'CI AMIGO DE LOS NIÑOS', Code: '021', Name: 'CI AMIGO DE LOS NIÑOS SAN JAVIER'},
];


