import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionDialogComponent } from './exception-dialog.component';
import { MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [ExceptionDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class ExceptionDialogModule { }
