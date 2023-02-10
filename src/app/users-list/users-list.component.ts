import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private userservices: UsersService
  ) { }
  public displayedColumns: string[] = ['userName', 'email', 'firstName', 'lastName', 'documentNo', 'Update']
  public users: any = []
  public countUsers:number = 0
  public initPageSize: number = 1
 
  ngOnInit(): void {
    
    this.userservices.getAllUser(0,this.initPageSize).subscribe(data=>
      {
        this.users = new MatTableDataSource(data["registros"][0])  
        this.countUsers = data["totalDbRegistros"]
       // this.pageChange()
      }
      )
  }
  ngAfterViewInit(): void {
   
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
  changePage(event: PageEvent) {
    //this.roles.paginator = this.paginator
    this.userservices.getAllUser(event.pageIndex,event.pageSize).subscribe(data=>
      {
        this.users = new MatTableDataSource(data["registros"][0])  
        this.countUsers = data["totalDbRegistros"]
      })
  }
  changePageIndex(event: Event) {
    console.log('Page index changed:', event);
  }
}
