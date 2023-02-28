import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { BeneficiaryBaseInfoDto } from 'src/app/interfaces/beneficiary-base-info-dto';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { FilesService } from 'src/app/services/files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  private recordId = '';
  public beneficiryData: BeneficiaryBaseInfoDto | undefined;
  public progress: number = 0;
  public message: string = "";
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private route: ActivatedRoute ,
    private formBuilder: FormBuilder,
    public FilesService: FilesService,
    public BeneficiariesService: BeneficiariesService,
  ) { }

  private userEncrypt:string = localStorage.getItem("user")!;
  private user =AES.decrypt(this.userEncrypt, environment.Key).toString(enc.Utf8);  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recordId =params['record'];
      this.BeneficiariesService.getById(this.recordId).subscribe(b => {
        this.beneficiryData = b['registros'][0];
      });
    })
  }

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    

    /*this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });*/
  }

}