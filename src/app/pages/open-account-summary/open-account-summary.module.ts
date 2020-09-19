import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAccountSummaryRoutingModule } from './open-account-summary-routing.module';
import { OpenAccountSummaryComponent } from './open-account-summary.component';
import { MatStepperModule,
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [OpenAccountSummaryComponent],
  imports: [
    CommonModule,
    OpenAccountSummaryRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule
  ]
})
export class OpenAccountSummaryModule { }
