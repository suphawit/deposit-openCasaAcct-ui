import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { OpenInquiryExportComponent } from './open-inquiry-export.component';
import { OpenInquiryExportRoutingModule } from './open-inquiry-export-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { ResendEmailComponent } from './resend-email/resend-email.component';
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
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule
  // MatMomentDateModule
} from '@angular/material';

@NgModule({
  declarations: [OpenInquiryExportComponent],
  imports: [
    CommonModule,
    OpenInquiryExportRoutingModule,
    LayoutModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    // MatMomentDateModule
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
})
export class OpenInquiryExportModule { }
