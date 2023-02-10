import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, AfterContentInit{

  public UpdateUsers = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    OtherName: new FormControl(''),
    LastName: new FormControl('',[Validators.required]),
    OtherSurName: new FormControl(''),
    Mail: new FormControl('', [Validators.required, Validators.email]),
    User: new FormControl('', [Validators.required]),
    Phone: new FormControl(''),
    PrimaryKey: new FormControl('', )
   });
   
  constructor(
    private route: Router,
    private formBulider: FormBuilder,
    private userservices: UsersService
  ) { }

  public urlTree = this.route.parseUrl(this.route.url);
  public userName = this.urlTree.queryParams['user'];
  public userUpdate: any;
  ngOnInit(): void {
    this.userservices.getUser(this.userName).subscribe(data=> {
      let user= data["registros"][0]
      this.UpdateUsers.patchValue({
        FirstName: user["firstName"],
        OtherName: user["otherNames"],
        LastName: user["lastName"],
        OtherSurName: user["otherLastName"],
        User: user["userName"],
        Mail: user["email"]
      })
    }
      )
  }
  ngAfterContentInit(): void {
    // console.log(this.userUpdate)
    // this.UpdateUsers.patchValue({
    //   User: this.userUpdate["userName"]
    // })
  }

}
