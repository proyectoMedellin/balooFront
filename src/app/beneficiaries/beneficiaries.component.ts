import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiariesListDto } from '../intefaces/beneficiaries-list-dto';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {

  displayedColumns: string[] = ['DocumentType', 'DocumentNumber', 'Names', 'LastNames'
  , 'Update', 'PhotoUpload'];
  dataSource = new MatTableDataSource<BeneficiariesListDto>(ELEMENT_DATA);

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

const ELEMENT_DATA: BeneficiariesListDto[] = [
  {Id: 'weqfwergrgwrgw45', DocumentType: '01', DocumentNumber: '', Names: '', LastNames:''},
  {Id: 'weqfwergrgwrgw45', DocumentType: '01', DocumentNumber: '', Names: '', LastNames:''},
];
