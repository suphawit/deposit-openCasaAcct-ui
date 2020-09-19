import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAccountComponent } from './open-account.component';
import { OpenAccountSummaryComponent } from './summary/open-account-summary.component';

const routes: Routes = [
  { path: '', component: OpenAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountRoutingModule { }
