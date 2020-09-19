import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
      path: '',
      component: PagesComponent,
      children: [
          { path: '', redirectTo: 'access-open-account', pathMatch: 'prefix'},
          { path: 'access-open-account', loadChildren: './access-open-account/access-open-account.module#AccessOpenAccountModule' },
          { path: 'open-account', loadChildren: './open-account/open-account.module#OpenAccountModule'},
          { path: 'open-account-approve', loadChildren: './open-account-approve/open-account-approve.module#OpenAccountApproveModule' },
          { path: 'open-account-verify', loadChildren: './open-account-verify/open-account-verify.module#OpenAccountVerifyModule' },
          { path: 'open-account-summary', loadChildren: './open-account-summary/open-account-summary.module#OpenAccountSummaryModule' },
          { path: 'resend-email', loadChildren: '../open-inquiry-export/resend-email/resend-email.module#ResendEmailModule' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
