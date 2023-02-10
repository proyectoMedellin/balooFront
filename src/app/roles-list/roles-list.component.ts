import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { SecurityRolService } from '../services/security-rol.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent  } from '@angular/material/paginator';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit, AfterContentInit {

 // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private rolesService : SecurityRolService) { }
  public displayedColumns: string[] = ['name', 'description', 'newAccessUserDefaultRol', 'enabled' ,'Update']
  public roles: any = []

  ngOnInit(): void {
    this.rolesService.getAllRoles().subscribe(data=> 
      {
        this.roles = new MatTableDataSource(data["registros"][0])
       // this.pageChange()
      })
    
  }
  ngAfterContentInit(): void {
    console.log(this.roles)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roles.filter = filterValue.trim().toLowerCase();
  }

  changePage(event: PageEvent) {
    //this.roles.paginator = this.paginator
    console.log('Page changed:', event);
  }
}
