import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAccountApproveComponent } from './open-account-approve.component';

const routes: Routes = [
  { path: '', component: OpenAccountApproveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountApproveRoutingModule { }
