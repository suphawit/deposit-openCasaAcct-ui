import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { OpenAccountApproveComponent } from './open-account-approve.component';
import { OpenAccountApproveRoutingModule } from './open-account-approve-routing.module';

@NgModule({
  declarations: [ OpenAccountApproveComponent ],
  imports: [
    CommonModule,
    OpenAccountApproveRoutingModule,
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
  ],
  providers: [ ]
})
export class OpenAccountApproveModule { }
