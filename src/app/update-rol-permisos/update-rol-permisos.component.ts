import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-rol-permisos',
  templateUrl: './update-rol-permisos.component.html',
  styleUrls: ['./update-rol-permisos.component.css']
})
export class UpdateRolPermisosComponent implements OnInit {

  public UpdateRole = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl(''),
    NewAccessUserDefaultRol: new FormControl(''),
    Enabled: new FormControl(''),
   });
  constructor(
    private route: Router,
  ) { }
  public urlTree = this.route.parseUrl(this.route.url);
  public rolName = this.urlTree.queryParams['rol'];
  public rolUpdate: any;

  ngOnInit(): void {
    console.log(this.rolName)
  }

}
