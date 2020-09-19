import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../shared/components/layout/layout.module';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatGridListModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { ResendEmailRoutingModule } from './resend-email-routing.module';
import { ResendEmailComponent } from './resend-email.component';

@NgModule({
  declarations: [ ResendEmailComponent ],
  imports: [
    CommonModule,
    ResendEmailRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class ResendEmailModule { }
