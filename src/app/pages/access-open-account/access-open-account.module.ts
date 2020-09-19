import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessOpenAccountRoutingModule } from './access-open-account-routing.module';
import { AccessOpenAccountComponent } from './access-open-account.component';

@NgModule({
  declarations: [AccessOpenAccountComponent],
  imports: [
    CommonModule,
    AccessOpenAccountRoutingModule
  ],
  providers: []
})
export class AccessOpenAccountModule { }
