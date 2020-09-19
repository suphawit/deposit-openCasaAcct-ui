import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAccountVerifyRoutingModule } from './open-account-verify-routing.module';
import { OpenAccountVerifyComponent } from './open-account-verify.component';
import { MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [OpenAccountVerifyComponent],
  imports: [
    CommonModule,
    OpenAccountVerifyRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxUiLoaderModule
  ]
})
export class OpenAccountVerifyModule { }
