import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DevelopmentRoomListDto } from '../intefaces/development-room-list-dto';

@Component({
  selector: 'app-development-rooms',
  templateUrl: './development-rooms.component.html',
  styleUrls: ['./development-rooms.component.css']
})
export class DevelopmentRoomsComponent implements OnInit {

  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'Code', 'Name'];
  dataSource = new MatTableDataSource<DevelopmentRoomListDto>(ELEMENT_DATA);

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

const ELEMENT_DATA: DevelopmentRoomListDto[] = [
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '011', CampusName: 'CI ALMALEGRE BARRIO CORAZÓN', Code:'0111', Name:'Sala 1'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '011', CampusName: 'CI ALMALEGRE BARRIO CORAZÓN', Code:'0112', Name:'Sala 2'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '012', CampusName: 'CI ALMALEGRE BARRIO CRISTÓBAL', Code:'0121', Name:'Sala 1'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '012', CampusName: 'CI ALMALEGRE BARRIO CRISTÓBAL', Code:'0122', Name:'Sala 2'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '013', CampusName: 'CI ALMALEGRE BARRIO EL SALADO', Code:'0131', Name:'Sala 1'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'01' , TrainingCenterName:'CI ALMALEGRE', CampusId:'', CampusCode: '013', CampusName: 'CI ALMALEGRE BARRIO EL SALADO', Code:'0132', Name:'Sala 2'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'02' , TrainingCenterName:'CI AMIGO DE LOS NIÑOS',CampusId:'',  CampusCode: '021', CampusName: 'CI AMIGO DE LOS NIÑOS SAN JAVIER', Code:'0211', Name:'Sala 1'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'02' , TrainingCenterName:'CI AMIGO DE LOS NIÑOS',CampusId:'',  CampusCode: '021', CampusName: 'CI AMIGO DE LOS NIÑOS SAN JAVIER', Code:'0212', Name:'Sala 2'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'02' , TrainingCenterName:'CI AMIGO DE LOS NIÑOS',CampusId:'',  CampusCode: '021', CampusName: 'CI AMIGO DE LOS NIÑOS SAN JAVIER', Code:'0213', Name:'Sala 3'},
  {Id: 'weqfwergrgwrgw45', TrainigCenterId: 'weqfwergrgwrgw45', TrainingCenterCode:'02' , TrainingCenterName:'CI AMIGO DE LOS NIÑOS',CampusId:'',  CampusCode: '021', CampusName: 'CI AMIGO DE LOS NIÑOS SAN JAVIER', Code:'0214', Name:'Sala 4'},
];