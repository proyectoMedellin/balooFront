import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiariesDevRoomListDto } from '../interfaces/beneficiaries-dev-room-list-dto';

@Component({
  selector: 'app-beneficiaries-development-rooms',
  templateUrl: './beneficiaries-development-rooms.component.html',
  styleUrls: ['./beneficiaries-development-rooms.component.css']
})
export class BeneficiariesDevelopmentRoomsComponent implements OnInit {

  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'DevelopmentRoomName', 
  'GroupId', 'GroupName', 'Year', 'Beneficiary', 'Update'];
  dataSource = new MatTableDataSource<BeneficiariesDevRoomListDto>(ELEMENT_DATA);

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

const ELEMENT_DATA: BeneficiariesDevRoomListDto[] = [
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', Beneficiary:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', Beneficiary:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', Beneficiary:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', Beneficiary:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', Beneficiary:''},
];