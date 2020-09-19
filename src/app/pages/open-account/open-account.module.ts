import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenAccountComponent } from './open-account.component';
import { OpenAccountRoutingModule } from './open-account-routing.module';
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
import { OpenAccountSummaryComponent } from './summary/open-account-summary.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenAccountStepFirstComponent } from './component/open-account-step-first/open-account-step-first.component';
import { OpenAccountStepSecondComponent } from './component/open-account-step-second/open-account-step-second.component';
import { OpenAccountStepThirdComponent } from './component/open-account-step-third/open-account-step-third.component';
import { OpenAccountStepFourthComponent } from './component/open-account-step-fourth/open-account-step-fourth.component';
import { OpenAccountStepFifthComponent } from './component/open-account-step-fifth/open-account-step-fifth.component';
import { OpenAccountStepEndComponent } from './component/open-account-step-end/open-account-step-end.component';
import { OpenAccountFormService } from './service/open-account-form.service';
import { SignaturePadModule } from 'angular2-signaturepad';
import { OpenAccountStepSummaryComponent } from './component/open-account-step-summary/open-account-step-summary.component';

@NgModule({
  declarations: [
    OpenAccountComponent,
    OpenAccountSummaryComponent,
    OpenAccountStepFirstComponent,
    OpenAccountStepSecondComponent,
    OpenAccountStepThirdComponent,
    OpenAccountStepFourthComponent,
    OpenAccountStepFifthComponent,
    OpenAccountStepEndComponent,
    OpenAccountStepSummaryComponent
  ],
  imports: [
    CommonModule,
    OpenAccountRoutingModule,
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
    MatListModule,
    SignaturePadModule
  ],
  providers: [
    OpenAccountFormService
  ]
})
export class OpenAccountModule { }
