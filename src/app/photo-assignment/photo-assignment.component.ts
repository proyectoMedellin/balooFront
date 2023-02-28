import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiariesListDto, ViewGridOptions } from '../interfaces/beneficiaries-list-dto';
import { BeneficiariesService } from '../services/beneficiaries.service';

@Component({
  selector: 'app-photo-assignment',
  templateUrl: './photo-assignment.component.html',
  styleUrls: ['./photo-assignment.component.css']
})
export class PhotoAssignmentComponent implements OnInit {
  confirmed = false;

  displayedColumns: string[] = ['DocumentTypeName', 'DocumentNumber', 'Names', 'LastNames', 'actions'];
  dataSource = new MatTableDataSource<BeneficiariesListDto>();
  options: ViewGridOptions = {
    page: 0,
    pageSize: 100
  }
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    private beneficiariesService: BeneficiariesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadData()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  LoadData(){
    this.beneficiariesService.getViewGrid(this.options)
    .subscribe(data => 
      {
        this.dataSource = new MatTableDataSource<BeneficiariesListDto>( data["registros"]);  
        this.dataSource.paginator = this.paginator;
      })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}