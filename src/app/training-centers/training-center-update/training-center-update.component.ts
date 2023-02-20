import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-center-update',
  templateUrl: './training-center-update.component.html',
  styleUrls: ['./training-center-update.component.css']
})
export class TrainingCenterUpdateComponent implements OnInit {

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private trainingCenterService: TrainingCenterService,
  ) { }
  private urlTree = this.route.parseUrl(this.route.url);
  private regiterId = this.urlTree.queryParams['register'];
  private regiterUpdate: any;

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public TrainingCenterForm = this.formBuilder.group({
    Id: [this.regiterId, Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true, Validators.required],
    ModifiedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    console.log(this.regiterId)
    this.trainingCenterService.GetByIdTraningCenter(this.regiterId).subscribe(data=> 
      {
        let regiter = data["registros"][0]
        this.TrainingCenterForm.patchValue({
          Code: regiter["code"],
          Name: regiter["name"],
          Enabled: regiter["enabled"],
        })
      }
    )
  }

  UpdateTrainingCenter(){
    this.trainingCenterService.updateTraningCenter(this.TrainingCenterForm.value).subscribe(response => location.href = environment.url + "TrainingCenters")
  }

}
