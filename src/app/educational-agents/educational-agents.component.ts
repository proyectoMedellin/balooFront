import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EducationalAgentsListDto } from '../intefaces/educational-agents-list-dto';

@Component({
  selector: 'app-educational-agents',
  templateUrl: './educational-agents.component.html',
  styleUrls: ['./educational-agents.component.css']
})
export class EducationalAgentsComponent implements OnInit {

  displayedColumns: string[] = ['TrainingCenterName', 'CampusName', 'DevelopmentRoomName', 
  'GroupId', 'GroupName', 'Year', 'EducationalAgentName', 'Update'];
  dataSource = new MatTableDataSource<EducationalAgentsListDto>(ELEMENT_DATA);

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

const ELEMENT_DATA: EducationalAgentsListDto[] = [
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', EducationalAgentName:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', EducationalAgentName:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', EducationalAgentName:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', EducationalAgentName:''},
  {TrainingCenterId: '', TrainingCenterName: 'CI ALMALEGRE', CampusId: '', CampusName: '', 
  DevelopmentRoomId: '', DevelopmentRoomName: '', GroupId:'', GroupName:'', Year:'', EducationalAgentName:''},
];