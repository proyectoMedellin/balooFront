import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-load-files',
  templateUrl: './users-load-files.component.html',
  styleUrls: ['./users-load-files.component.css']
})
export class UsersLoadFilesComponent implements OnInit {

  @ViewChild(MatTableExporterDirective) exporter!: MatTableExporterDirective;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable = false
  displayedColumns: string[] = ['UserName', 'UserEmail', 'DocumentTypeCode', 'DocumentNumber', 'FirstName', 'OtherNames', 'LastName', 'OtherLastNames', 'Phone', 'SecurityRol', 'TrainingCenterCode', 'CampusCode'];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  exportTable() {
    // console.log(this.exporter)
    this.exporter.exportTable('xlsx', {fileName: 'my_table'});
  }

  form: FormGroup = this.formBuilder.group({
    userName: '',
    userEmail: '',
    documentTypeCode: '',
    documentNumber: '',
    firstName: '',
    otherNames: '',
    lastName: '',
    otherLastNames: '',
    phone: '',
    securityRol: '',
    trainingCenterCode: '',
    campusCode: ''
  });

  loadExcelFile(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, {type: 'binary'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
      const headers: any = data[0];
      const values = data.slice(1);

      const objects = values.map((row: any) => {
        const object: any = {};
        headers.forEach((header: any, index: any) => {
          object[this.displayedColumns[index]] = row[index];
        });
        return object;
      });

      this.dataSource.data = objects;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      // Set form values
      values.forEach((e: any) => {
        const firstRow: any = e;
        this.form.setValue({
          userName: e[0],
          userEmail: e[1],
          documentTypeCode: e[2],
          documentNumber: e[3],
          firstName: e[4],
          otherNames: e[5],
          lastName: e[6],
          otherLastNames: e[7],
          phone: e[8],
          securityRol: e[9],
          trainingCenterCode: e[10],
          campusCode: e[11]
        });
        console.log(e)
      })
    };
    reader.readAsBinaryString(file);
  }
}
