import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsersListDto } from '../intefaces/users-list-dto';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  
  public displayedColumns: string[] = ['userName', 'email', 'firstName', 
    'lastName', 'documentNo', 'Update']
  public countUsers:number = 0
  public initPageSize: number = 1
  users: UsersListDto[] = [];
  dataSource = new MatTableDataSource<UsersListDto>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private userservices: UsersService
  ) { }
 
  ngOnInit(): void {   
    this.userservices.getAllUser(0,this.initPageSize).subscribe(data=>
      {
        this.users = data["registros"][0];  
        //console.log(this.users)
        this.countUsers = data["totalDbRegistros"];
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  changePage(event: PageEvent) {
    //this.roles.paginator = this.paginator
    /*this.userservices.getAllUser(event.pageIndex,event.pageSize).subscribe(data=>
      {
        this.users = new MatTableDataSource(data["registros"][0])  
        this.countUsers = data["totalDbRegistros"]
      })*/
  }
  changePageIndex(event: Event) {
    console.log('Page index changed:', event);
  }
  deletedRegister(userName: string){
    this.userservices.deletedUser(userName).subscribe(()=> location.reload())
  }
}

