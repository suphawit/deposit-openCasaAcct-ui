import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestIdpassComponent } from './test-idpass.component';

const routes: Routes = [{ path: '', component: TestIdpassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestIdpassRoutingModule { }
