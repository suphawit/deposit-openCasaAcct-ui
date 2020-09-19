import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenAccountVerifyComponent } from './open-account-verify.component';

const routes: Routes = [
  { path: '', component: OpenAccountVerifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountVerifyRoutingModule { }
