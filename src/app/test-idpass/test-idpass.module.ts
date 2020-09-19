import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestIdpassComponent } from './test-idpass.component';
import {TestIdpassRoutingModule} from './test-idpass-routing.module'

@NgModule({
  declarations: [TestIdpassComponent],
  imports: [
    CommonModule,
    TestIdpassRoutingModule
  ]
})
export class TestIdpassModule { }
