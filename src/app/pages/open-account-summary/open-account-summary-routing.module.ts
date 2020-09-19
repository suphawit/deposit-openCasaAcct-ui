import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAccountSummaryComponent } from './open-account-summary.component';

const routes: Routes = [
  { path: '', component: OpenAccountSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountSummaryRoutingModule { }
