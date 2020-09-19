import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerErrorComponent } from './server-error.component';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ServerErrorRoutingModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  declarations: [ServerErrorComponent]
})
export class ServerErrorModule { }
