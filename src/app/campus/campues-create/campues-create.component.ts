import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AES, enc } from 'crypto-js';
import { TrainingCenterListDto } from 'src/app/interfaces/training-center-list-dto';
import { CampusService } from 'src/app/services/campus.service';
import { TrainingCenterService } from 'src/app/services/training-center.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campues-create',
  templateUrl: './campues-create.component.html',
  styleUrls: ['./campues-create.component.css']
})
export class CampuesCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private campusService: CampusService,
    public trainingCenterService: TrainingCenterService
    ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);

  public listaCentros: TrainingCenterListDto[] = [];
  CampusForm = this.formBuilder.group({
    TrainingCenterId:['', Validators.required],
    Code:['', Validators.required],
    Name:['', Validators.required],
    Enabled:[true],
    CreatedBy:[this.user, Validators.required]
  });

  ngOnInit(): void {
    this.Trainingcenter()
  }
  Trainingcenter(){
    this.trainingCenterService.GetAllEnabledTraningCenter().subscribe(data => this.listaCentros = data["registros"])
  }
  CreateCampus(data: any){
    this.campusService.createCampus(data).subscribe(response => location.href = environment.url + "Campus")
  }

}
