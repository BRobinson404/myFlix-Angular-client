import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movie: any; dialogType: 'genre' | 'director' | 'synopsis' }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
