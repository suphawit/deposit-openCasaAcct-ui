import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
  { path: 'idpass', loadChildren: './test-idpass/test-idpass.module#TestIdpassModule' },
  { path: 'open-inquiry', loadChildren: './open-inquiry-export/open-inquiry-export.module#OpenInquiryExportModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
