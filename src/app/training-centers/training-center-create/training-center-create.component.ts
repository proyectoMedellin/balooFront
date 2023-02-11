import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-training-center-create',
  templateUrl: './training-center-create.component.html',
  styleUrls: ['./training-center-create.component.css']
})
export class TrainingCenterCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public userservice: UsersService,
  ) { }

  public TrainingCenterForm = this.formBuilder.group({
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:['true', Validators.required]
  });
  public TrainingCenterStatus: boolean = true;

  ngOnInit(): void {
  }

}
