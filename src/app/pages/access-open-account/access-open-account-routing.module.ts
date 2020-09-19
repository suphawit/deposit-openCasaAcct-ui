import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessOpenAccountComponent } from './access-open-account.component';

const routes: Routes = [
  { path: 'refcode/:refcode', component: AccessOpenAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessOpenAccountRoutingModule { }
