import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog.component.css'],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type:string, title: string, message: string, textButton: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}


