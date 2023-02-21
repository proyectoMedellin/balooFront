import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
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
    private route: ActivatedRoute ,
    private formBuilder: FormBuilder,
    private trainingCenterService: TrainingCenterService,
  ) { }
 
  private recordId = '';
  private regiterUpdate: any;

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public TrainingCenterForm = this.formBuilder.group({
    Id: ['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true, Validators.required],
    ModifiedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recordId =params['record']
      this.TrainingCenterForm.patchValue({ 
        Id: this.recordId 
    })
      // hacer algo con los parámetros...
    });
    this.trainingCenterService.GetByIdTraningCenter(this.recordId).subscribe(data=> 
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
